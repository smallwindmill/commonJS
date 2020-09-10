var wifi = require('../dist/tello-video-server.js');
// console.log(wifi);
wifi.startServer(900);
setTimeout(()=>wifi.closeServer(),3000);
// var wifi = require('../src/wifi.js').telloTeamScan;
// console.log('ff=', wifi);
// var dgram = require("dgram");
// var server = dgram.createSocket('udp4');
// server.bind(8889);

// wifi = new wifi(server);
