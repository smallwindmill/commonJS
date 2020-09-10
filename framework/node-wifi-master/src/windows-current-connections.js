var { execFile, exec } = require('child_process');
var env = require('./env');
var networkUtils = require('./utils/network-utils.js');

function parseShowInterfaces(stdout) {
  var lines = stdout.split('\r\n');
  var connections = [];
  var i = 3;
  while (lines.length > i + 18) {
    var tmpConnection = {};
    var fields = [
      'name',
      'description',
      'guid',
      'mac',
      'state',
      'ssid',
      'bssid',
      'mode',
      'radio',
      'authentication',
      'encryption',
      'connection',
      'channel',
      'reception',
      'transmission',
      'signal',
      'profil'
    ];
    // console.log('line==', lines);
    let len = 0;
    for (var j = 0; j < fields.length; j++) {
      var line = lines[i + j];
      // 切割字符串，获取键值对
      var _line = line.split(/ : /);
      if(!_line) continue;
      // 替换字符串首尾的空格
      var _key = _line[0].toLowerCase().replace(/ /g, '');
      _line[1] = (" "+_line[1]+" ");
      var _value =  _line[1] ? _line[1].replace(/^ | $/g, '') : "";
      // console.log('len==', _line[0]);
      if(_key == 'name' && len != 0){
        break;
      }else{
        len++;
        tmpConnection[_key] = _value;
      }
    }
    // console.log('cc==', tmpConnection);
    if(!tmpConnection['name']) {
    // if(!tmpConnection['ssid'] || tmpConnection["state"] != 'connected') {
      // 未连接状态也返回，用于后续多网卡连接wifi
      i = i + len;
      continue;
    }

    connections.push({
      iface: tmpConnection['name'],
      ssid: tmpConnection['ssid'],
      bssid: tmpConnection['bssid'],
      mac: tmpConnection['bssid'],
      mode: tmpConnection['mode'],
      description: tmpConnection['description'],
      channel: parseInt(tmpConnection['channel']),
      frequency: parseInt(
        networkUtils.frequencyFromChannel(parseInt(tmpConnection['channel']))
      ),
      signal_level: networkUtils.dBFromQuality(tmpConnection['signal']),
      quality: parseFloat(tmpConnection['signal']),
      security: tmpConnection['authentication'],
      security_flags: tmpConnection['encryption']
    });
    i = i + len;
  }

  return connections;
}

function getCurrentConnection(config, callback) {
  exec('chcp 437 && netsh wlan show interfaces', { env }, function(err, stdout) {
  // execFile('netsh', params, { env }, function(err, stdout) {
    if (err) {
      callback && callback(err);
    } else {
      try {
        var connections = parseShowInterfaces(stdout, config);
        callback && callback(null, connections);
      } catch (e) {
        callback && callback(e);
      }
    }
  });
}

module.exports = function(config) {
  return function(callback) {
    if (callback) {
      getCurrentConnection(config, callback);
    } else {
      return new Promise(function(resolve, reject) {
        getCurrentConnection(config, function(err, connections) {
          if (err) {
            reject(err);
          } else {
            resolve(connections);
          }
        });
      });
    }
  };
};
