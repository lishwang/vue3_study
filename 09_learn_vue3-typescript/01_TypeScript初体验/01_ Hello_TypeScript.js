"use strict";
exports.__esModule = true;
/**
 * 执行该ts代码有三种方法：
 * 方法一：tsc + 01_ Hello_TypeScript ，只能将 ts 代码 编译成 js 代码
 * 方法二：全局安装 ts-node 、tslib 、 @types/node 这三个包，然后执行 ts-node + 01_ Hello_TypeScript' 可以直接运行在 node 环境上（编译 + 运行 ts代码）
 * 方法三：通过 webpack 搭建一个环境，可以自动在浏览器上运行，并且支持热替换（HMR ： hot module replace）
 */
var name = 'abc';
var age = 18;
console.log(name);
console.log(age);

export { }
