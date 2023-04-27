import { sum } from './js/math';
import './js/element'
import './js/babel-demo'

const { priceFormat } = require('./js/formate');

console.log(sum(20, 30));
console.log(priceFormat(66.66));

// 默认使用的vue构件工具是 vue.runtime.esm-bundler.js 不可编译 template
// import { createApp } from 'vue'  
// 使用的vue构件工具是 vue.esm-bundler.js 可编译 template
import { createApp } from 'vue/dist/vue.esm-bundler.js'

const app = createApp({
  template: '#my-app',
  data () {
    return {
      message: 'hello world!!!'
    }
  }
});
app.mount('#app');