var { execFile, exec} = require('child_process');
var networkUtils = require('./utils/network-utils');
var env = require('./env');

function scanWifi(config, callback) {
  try {
    exec('chcp 437 && netsh wlan show networks mode=Bssid',
      { env },
      function(err, scanResults) {
        if (err) {
          callback && callback(err);
          return;
        }

        let _index = -1;
        let arr = scanResults
          .toString('utf8')
          .split('\r')
          .join('')
          .split('\n');

        for(let i in arr){
          if(arr[i].match("SSID 1")){
            _index = i;
            break;
          }
        }

        console.log("index===", _index);
        scanResults = arr.slice(_index==-1?4:_index, scanResults.length);

        var numNetworks = -1;
        var currentLine = 0;
        var networkTmp;
        var networksTmp = [];
        var network;
        var networks = [];
        var i;
        // console.log("scanResults777==", scanResults);

        for (i = 0; i < scanResults.length; i++) {
          if (scanResults[i] === '') {
            numNetworks++;
            networkTmp = scanResults.slice(currentLine, i);
            networksTmp.push(networkTmp);
            currentLine = i + 1;
          }
        }

        for (i = 0; i < numNetworks; i++) {
          // skip empty networks
          if (networksTmp[i] && networksTmp[i].length > 0) {
            network = parse(networksTmp[i]);
            networks.push(network);
          }
        }
        callback && callback(null, networks);
      }
    );
  } catch (e) {
    callback && callback(e);
  }
}

function parse(networkTmp) {
  var network = {};

  network.mac = networkTmp[4] ? networkTmp[4].match(/.*?:\s(.*)/)[1] : '';
  network.bssid = network.mac;
  network.ssid = networkTmp[0] ? networkTmp[0].match(/.*?:\s(.*)/)[1] : '';
  network.channel = networkTmp[7]
    ? parseInt(networkTmp[7].match(/.*?:\s(.*)/)[1])
    : -1;
  network.frequency = network.channel
    ? parseInt(networkUtils.frequencyFromChannel(network.channel))
    : 0;
  network.signal_level = networkTmp[5]
    ? networkUtils.dBFromQuality(networkTmp[5].match(/.*?:\s(.*)/)[1])
    : Number.MIN_VALUE;
  network.quality = networkTmp[5]
    ? parseFloat(networkTmp[5].match(/.*?:\s(.*)/)[1])
    : 0;
  network.security = networkTmp[2] ? networkTmp[2].match(/.*?:\s(.*)/)[1] : '';
  network.security_flags = networkTmp[3]
    ? networkTmp[3].match(/.*?:\s(.*)/)[1]
    : '';
  network.mode = 'Unknown';
  // console.log("network==", network);
  return network;
}

module.exports = function(config) {
  return function(callback) {
    if (callback) {
      scanWifi(config, callback);
    } else {
      return new Promise(function(resolve, reject) {
        scanWifi(config, function(err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        });
      });
    }
  };
};
