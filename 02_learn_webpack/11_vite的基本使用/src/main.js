// 浏览器现在可以解析这种 es模块化 代码；但是引入文件需要加后缀，如果在webpack等配置中可以配置相关属性，可省去 .js .vue 等后缀
// 由于当前版本浏览器支持解析这种 es模块化 代码，但用户的浏览器版本可能低一些，不支持，因此在打包上线的时候可以用 vite 等打包工具做适配，将 es6 代码 转换成 es5 代码，再进行打包
import { sum } from './js/math.js';

// 引入 typescript 文件，vite 默认可以解析 .ts 文件
import mul from './ts/mul.ts';

// 引入 vue 文件
import App from './vue/demo.vue';

// 从 vue 包中解构出 createApp 方法
import { createApp } from 'vue';

/***
 * 引用 lodash 中的方法
 * 1、npm install lodash-es
 * 2、导入lodash
 * 2.1、没有打包工具时需要从 node_modules 中导入
 * 缺点：虽然可以正常使用，但是这个包所依赖的其他文件都会在浏览器的网络请求中被请求加载（每个文件都要发送一次请求）
 *      1、某些文件是不识别的（.ts / .vue 等）；
 *      2、如果包之间依赖太多，会在浏览器的网络请求中发送多个的网络请求；
 * import _ from '../node_modules/lodash-es/lodash.default.js';
 * 
 * 2.2 使用 vite 打包工具
 * 优点：节省性能，浏览器不用加载多余的包；
 * 由于没有写配置文件，本次使用 vite 构建项目需要运行 npx vite；vite会自动构建一个本地服务，点击链接即可进入页面
 * import _ from 'lodash-es';
 */
// import _ from '../node_modules/lodash-es/lodash.default.js';
import _ from 'lodash-es';

import './css/style.css';
import './css/title.less';

console.log('hello world!!!');
console.log(sum(20, 30));
console.log(mul(20, 30));

console.log(_.join(['abc', 'cba'], '-'));  // 'abc-cba'

const divEl = document.createElement('div');
divEl.className = 'title';
divEl.innerHTML = 'hello vite!!!';
document.body.appendChild(divEl);

// 挂载 vue3 文件
createApp(App).mount('#app');