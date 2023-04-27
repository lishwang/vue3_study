const path = require('path')
// 需要先安装html-webpack-plugin，然后在引入，为了配置模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 配置为开发模式
  mode: 'development',
  // 入口
  entry: './src/main.ts',
  // 出口
  output: {
    // 路径拼接
    path: path.resolve(__dirname, './dist'),
    // 打包后的文件名字
    filename: 'bundle.js'
  },
  resolve: {
    // 模块引入时默认匹配的后缀名
    extensions: ['.ts', '.js', '.cjs', '.json']
  },
  // 配置 loader
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      // 配置使用的模板
      template: './index.html'
    })
  ]
}