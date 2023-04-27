const path = require('path');

module.exports = {
  // 修改 webpack 打包的入口文件，默认为 ./src/index.js
  entry: './src/main.js',
  output: {
    // 修改 webpack 打包的出口文件，默认为 dist/main.js
    // 这里的路径必须为绝对路径，resolve() 方法用于拼接两个路径
    path: path.resolve(__dirname, "./build"),
    // 修改 webpack 打包的出口文件名，默认为 main.js
    filename: 'bundle.js'
  },
  // 加载解析不同的模块，需要在这里配置
  module: {
    // 加载不同的模块，配置不同的规则
    rules: [
      {
        // 用后面的正则表达式做匹配
        test: /\.css$/, //用正则匹配以 .css 结尾的文件
        // 使用哪个 loader
        // 1、loader 简单写法（语法糖）
        // loader: 'css-loader',
        // 2、loader 完整写法
        use: [
          // {loader: 'css-loader'}
          'style-loader',
          'css-loader',

          // postcss-loader 写法一：
          // {
          //   // 给样式自动加上 浏览器前缀 的插件
          //   loader: 'postcss-loader',
          //   // 给对应的 loader 配置额外的选项
          //   options: {
          //     postcssOptions: {
          //       // 指定使用的插件
          //       plugins: [
          //         require('autoprefixer')
          //       ]
          //     }
          //   }
          // }

          // postcss-loader 写法二：在 postcss.config.js 文件下写 额外的配置项
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        // 可以将 .less 和 .css 文件写在一起，如下：
        // test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}