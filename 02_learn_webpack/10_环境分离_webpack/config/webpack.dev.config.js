const path = require('path');

// webpack 在开发环境下的配置  npm run serve
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 引入 webpack-merge 里的合并函数，用于合并webpack的配置
const { merge } = require('webpack-merge');

// 引入公共的 webpack 配置
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  // 设置模式
  // development 开发阶段，会设置为 development
  // production 准备打包上线的时候，设置为 production
  mode: 'development',
  // 设置 source-map，建立js映射文件，方便调试代码和错误，生成对应的源代码时也会生成对应的source-map文件
  devtool: 'source-map',
  // devServer 的配置
  devServer: {
    // 从 public 文件夹查找文件,此文件夹不会被打包,只有浏览器使用到该文件夹中文件内容的时候,express 才会查找并读取该文件
    // contentBase: './public', // contentBase 已经被弃用了，已经被 static 替换
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // 配置是否启用 gzip 压缩
    compress: true,
    // 修改端口号
    port: 9000,
    // 启用 webpack 的模块热替换特性。DevServer默认的行为是在发现源代码被更新后会通过自动刷新整个页面来做到实现预览，
    // 开启模块热替换功能后在不刷新整个页面的情况下通过用心模块替换老模块来实现实时预览。
    hot: true,
    // 配置本地服务代理解决跨域
    proxy: {}
  },
  // 插件
  plugins: [
    // 重新打包时，自动删除上一次的打包文件
    new CleanWebpackPlugin(),

  ]
})