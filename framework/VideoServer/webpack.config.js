// patch 'fs' to fix EMFILE errors, for example on WSL
var realFs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(realFs);
var path = require('path');

module.exports = [
  {
    entry: {
      wifiManager: './src/index.js',
    },
    output: {
      filename: 'tello-video-server.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'yourLibName',
      libraryTarget: 'commonjs2'
    },
    mode: "production",
    target: "node",
    node: {
      // fs: 'gg',
      // child_process: 'gg'
    }
  }];
