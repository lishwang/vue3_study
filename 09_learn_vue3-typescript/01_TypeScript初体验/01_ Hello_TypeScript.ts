/**
 * 执行该ts代码有三种方法：
 * 方法一：tsc + 01_ Hello_TypeScript.ts ，只能将 ts 代码 编译成 js 代码
 * 方法二：全局安装 ts-node 、tslib 、 @types/node 这三个包，然后执行 ts-node + 01_ Hello_TypeScript.ts' 可以直接运行在 node 环境上（编译 + 运行 ts代码）
 * 方法三：通过 webpack 搭建一个环境，可以自动在浏览器上运行，并且支持热替换（HMR ： hot module replace）
 */
const name: string = 'abc';
const age: number = 18

console.log(name)
console.log(age)

// 用于解决 作用域的问题，默认情况下，所有 ts 文件都是在同一个作用域下进行编译的，
// 如果 在其他文件中或者在浏览器的整个dom环境下 有与本文件内相同的变量名（如：name），这个变量名就会冲突报错；
// 把这个 ts文件 模块化，模块里面都有自己单独的作用域，因此可以解决变量名冲突的问题；
export {}