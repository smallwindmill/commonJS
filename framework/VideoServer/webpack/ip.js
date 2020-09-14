var wifi = require('./chunks/d08bf37fd966e2edf243.chunk')
console.log("wifi", wifi);
// wifi = require('./chunks/d08bf37fd966e2edf243.chunk').modules['./src/modules/wifiManager.js']
wifi = require('./chunks/d08bf37fd966e2edf243.chunk').modules['./src/blocks/functionalModule/scratch3_tello.js']
console.log("wifi===", wifi);

var wifi = new wifi();
wifi.init();
wifi.scan();
