// patch 'fs' to fix EMFILE errors, for example on WSL
var realFs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(realFs);
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

module.exports = [
  {
    entry: {
      wifiManager: './src/wifi.js',
    },
    devtool: '' ,
    output: {
      filename: 'wifi-manager.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'yourLibName',
      libraryTarget: 'commonjs2'
    },
    mode: "production",
    target: "node",
    node: {
      // fs: 'gg',
      // child_process: 'gg'
    },
    module: {
        rules: [
        {
            test: /\.js?$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src')],
            query: {
              presets: [['@babel/preset-env', {targets: {browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']}}]]
            }
        }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.*$/,
                uglifyOptions: {
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        // drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                      },
                      output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                      }
                }
            })
        ],
    }
  }];
