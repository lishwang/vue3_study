import { sum } from './js/math';
import './js/element'
import './js/babel-demo'

const { priceFormat } = require('./js/formate');

console.log(sum(20, 30));
console.log(priceFormat(66.66));

// 默认使用的vue构件工具是 vue.runtime.esm-bundler.js 不可编译 template
// import { createApp } from 'vue'  
// 使用的vue构件工具是 vue.esm-bundler.js 可编译 template

// import { createApp } from 'vue/dist/vue.esm-bundler.js'
// template 模板写在 public/index.html 中
// const app = createApp({
//   template: '#my-app',
//   data () {
//     return {
//       message: 'hello world!!!'
//     }
//   }
// });
// app.mount('#app');


import { createApp } from 'vue/dist/vue.esm-bundler.js'  // 这里可以直接引用 'vue'，因为 .vue 组件中的 template 会被 vue-loader 解析，因此，不需要引用 'vue/dist/vue.esm-bundler.js' 去解析 template 
import App from './vue/app.vue'
const app = createApp(App);
app.mount('#app');