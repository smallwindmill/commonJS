var wifiTello = require('../dist/wifi-manager.js').telloTeamScan;
// var wifi = require('../dist/wifi-manager.js').wifiManager;
var wifi = require('../src/wifi.js').wifiManager;
// var wifi = require('../src/wifi.js').telloTeamScan;
// console.log('ff=', wifi);
// var dgram = require("dgram");
// var server = dgram.createSocket('udp4');
// server.bind(8889);

wifi = new wifi();
wifiTello = new wifiTello('', 1, 50, {'0TQZH4LED004VU': 5, "0TQZH4LED004N5": 13, '0TQZH79ED00HCM': 23 });

wifi.init();
if (process.env.PROMISE == "true") {
  console.log('with promise');
  /*wifi.scan().then(function (networks) {
    console.log(networks);
  }).catch(function (e) {
    console.log(e);
  })*/
} else {
  console.log('with callback');
  /*wifi.getCurrentConnections(function(err, networks) {
      if (err) {
          console.log(err);
      } else {
          console.log('nn===', networks);
      }
  });*/
  wifi.connect({ ssid: "TELLO-喜欢", password: "RMTT-B33E60", iface: "WLAN 8" }, function(err, networks) {
      if (err) {
          console.log(err);
      } else {
          console.log('nn===', networks);
      }
  });

}

/*wifiTello.startScan().then((res)=>{
   console.log('res===', res);
   console.log('wifiTello===', wifiTello);
})*/
