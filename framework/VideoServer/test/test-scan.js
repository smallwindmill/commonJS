var wifi = require('../dist/wifi-manager.js').telloTeamScan;
// var wifi = require('../src/wifi.js').telloTeamScan;
// console.log('ff=', wifi);
// var dgram = require("dgram");
// var server = dgram.createSocket('udp4');
// server.bind(8889);

// wifi = new wifi(server);
wifi = new wifi('', 1, 0);


if (process.env.PROMISE == "true") {
  console.log('with promise');
  /*wifi.scan().then(function (networks) {
    console.log(networks);
  }).catch(function (e) {
    console.log(e);
  })*/
} else {
  console.log('with callback');
  /*wifi.scan(function(err, networks) {
      if (err) {
          console.log(err);
      } else {
          console.log(networks);
      }
  });*/

}

wifi.startScan().then((res)=>{
   // console.log('res===', res);
   console.log('wifi===', wifi);
})
