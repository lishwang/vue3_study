// webpack 公共的配置

const path = require('path');
// 引入插件，由于插件是第三方文件，引入方式没有统一规定，根据第三方插件导出内容进行引入；

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入 webpack 内置插件，解决 BASE_URL 的指向问题
const { DefinePlugin } = require('webpack');

// 引入 vue-loader 包中的插件，用于解析 .vue 文件
const { VueLoaderPlugin } = require('vue-loader/dist/index');

module.exports = {
  // 为哪个环境打包：'web' 浏览器环境； 'node' node环境；
  target: 'web',


  // 修改 webpack 打包的入口文件，默认为 ./src/index.js
  entry: './src/main.js',
  output: {
    // 修改 webpack 打包的出口文件，默认为 dist/main.js
    // 这里的路径必须为绝对路径，resolve() 方法用于拼接两个路径
    path: path.resolve(__dirname, "../build"),
    // 修改 webpack 打包的出口文件名，默认为 main.js
    filename: 'js/bundle.js'
  },
  // resolve 文件路径的查找
  resolve: {
    // 文件引入时省略后缀，默认按照以下数组以此匹配
    extensions: ['.js', '.json', '.mjs', '.vue', '.ts', '.jsx', '.tsx'],
    // 路径取别名
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'js': path.resolve(__dirname, '../src/js')
    }
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
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/i,
        // test: /\.(jpe?g|png|svg)/, 与上面写法等价，参考 正则语法
        // use: 'file-loader',
        use: {
          loader: 'file-loader',
          options: {
            // 写法一：
            // 输出文件名
            outputPath: 'img',
            /**
             * [name] 源文件名称
             * _ 分隔符，可自定义
             * [hash:6] 取6位hash值，用于区分名字相同的文件
             * [ext] 源文件拓展后缀
             */
            name: '[name]_[hash:6].[ext]',

            // 写法二：
            // name: 'img/[name]_[hash:6].[ext]'
          }
        }
      },
      // {
      //   test: /\.(eot|ttf|woff2?|svg)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: 'font/[name]_[hash:6].[ext]'
      //     }
      //   },
      // },
      {
        test: /\.(eot|ttf|woff2?|svg)$/,
        type: 'asset', // 这个相当于 file-loader ，
        generator: {
          filename: 'font/[name]_[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },

      // 将 js 文件内的 ES6 及以上的代码转换成 ES5  方法一：
      // {
      //   // 将 js 文件内的 ES6 及以上的代码转换成 ES5 
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       // 方法一： 插件
      //       // plugins: [
      //       //   '@babel/plugin-transform-arrow-functions',  // 将 箭头函数 转换成 普通function
      //       //   '@babel/plugin-transform-block-scoping',  // 将 const 转换成 var 
      //       // ]
      //       // 方法二： Babel的预设，常见的预设有以下三个（这里的配置也可以抽离出去，写在babel.config.js文件内）
      //       presets: [
      //         '@babel/preset-env',
      //         // '@babel/preset-react',
      //         // '@babel/preset-TypeScript'
      //         // 如果想给预设再指定其内部配置可以按照如下写法
      //         // ['@babel/preset-env', {}]
      //       ]
      //     }
      //   }
      // }
      // 将 js 文件内的 ES6 及以上的代码转换成 ES5  方法二：
      // 配置也可以抽离出去，写在babel.config.js文件内
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  plugins: [

    // 打包文件内根据自带的模板自动生成 index.html 文件，详细配置查看 github 
    new HtmlWebpackPlugin({
      // 如果配置了模板，可以把跟目录下的 index.html 文件删除
      template: '../public/index.html',
      // 用于填充 打包后的 index.html 中的 <title> </title>标签内容
      title: '哈哈哈哈'
    }),
    // webpack内部插件，用于配置 BASE_URL 这种常量
    new DefinePlugin({
      // 注意：这里的双引号内部应该是一个变量，如果想写一个字符串必须再加一个引号包裹；
      BASE_URL: "'./'",
      /**
       * 消除警告：
       * Feature flags __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ are not explicitly defined. You
       *  are running the esm-bundler build of Vue, which expects these compile-time feature flags
       *  to be globally injected via the bundler config in order to get better tree-shaking in
       *  the production bundle.
       *  For more details, see https://link.vuejs.org/feature-flags.（参考这个链接，解决警告）
       */
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),

    // 用于解析 .vue 文件
    new VueLoaderPlugin()
  ]
}