// webpack 在生产环境下的配置 npm run build
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 引入 webpack-merge 里的合并函数，用于合并webpack的配置
const { merge } = require('webpack-merge');

// 引入公共的 webpack 配置
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  // 设置模式
  // development 开发阶段，会设置为 development
  // production 准备打包上线的时候，设置为 production
  mode: 'production',
  // 插件
  plugins: [
    // 用于文件的拷贝，打包时文件直接拷贝到打包文件内
    new CopyWebpackPlugin({
      patterns: [
        {
          // 从哪个文件夹下复制
          from: './public',
          // 粘贴到打包后的文件夹下的那个目录，可以不写，默认到打包根目录
          to: './',
          globOptions: {
            // 复制的文件夹内要忽略的文件
            ignore: [
              // ** 表示不管有多少层级，取其内部的 index.html 文件
              // 注意：这样写必须保证有其他文件不被忽略；不然会报错
              '**/index.html'
            ]
          }
        }
      ]
    }),
  ]
})