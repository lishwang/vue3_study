const path = require('path');

module.exports = {
  mode: 'production',
  // 修改 webpack 打包的入口文件，默认为 ./src/index.js
  entry: './src/main.js',
  output: {
    // 修改 webpack 打包的出口文件，默认为 dist/main.js
    // 这里的路径必须为绝对路径，resolve() 方法用于拼接两个路径
    path: path.resolve(__dirname, "./build"),
    // 修改 webpack 打包的出口文件名，默认为 main.js
    filename: 'bundle.js'
  }
}