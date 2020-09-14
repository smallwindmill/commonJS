// var { execFile, exec} = require('child_process');
var {exec} = require('sudo-prompt');
var networkUtils = require('./utils/network-utils');
var env = require('./env');



const handleFW = {
  getFWStatus: () => {

    return new Promise((resolve, reject)=>{
        if(process.platform != "win32") {reject('just for win, this is ', process.platform);return;}
        var options = {
          name: 'Electron',
          icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
        };
        exec('chcp 437 && NetSh Advfirewall show allprofiles state', options, (error, res)=>{
          if(error) {reject(error);return;}
          if(res.match(/ on/gi)){
            resolve(true);
          }else{
            resolve(false);
          }
        })
    })
  },
  setFWStatus: (status) => {
    if(process.platform != "win32") {reject('just for win, this is ', process.platform);return;}
    return new Promise((resolve, reject)=>{
      // console.log('NetSh Advfirewall set allprofiles state '+ status?'on':'off');
      var options = {
        name: 'Electron',
        icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
      };
      exec('NetSh Advfirewall set allprofiles state '+(status?'on':'off'), options, (error, res)=>{
        if(error) {reject(error);return;}
        resolve('ok');
      })
    })
  }

}

module.exports = handleFW;
