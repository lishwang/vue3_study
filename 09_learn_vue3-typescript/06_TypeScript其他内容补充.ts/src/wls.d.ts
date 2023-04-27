/**
 * 这个文件是自定义的类型声明文件，不需要在任何文件中引入，
 * 文件可以放置在本项目中的任意位置，本文件会被自动扫描到；
 */

/**
 * 以 lodash 库为例（lodash库在 公有库 DefinitelyTyped 中存放有对应的类型声明文件，
 * 在此我们自己实现这个 lodash 库的 类型声明文件）；
 */

/**
 * 声明模块
 */
// declare module 'lodash' 给 'lodash' 这个库声明一个模块空间
declare module 'lodash' {
	// 声明 lodash 库中的 join 方法； （这个文件里面只做类型声明，不用实现具体的方法）
  // 声明 join 方法，要求传入一个任意类型的数组，返回值任意
	export function join(arr: any[]): void
}

/**
 * 声明变量、函数、类
 */
// 声明 wlsName变量，字符串类型
declare let wlsName: string

// 声明 wlsFoo函数，没有参数，返回值任意类型
declare function wlsFoo(): void

// 声明 Person类  -- es6
declare class Person {
  name: string
  age: number
  constructor(name: string, age: number)
}

/**
 * 声明文件
 */
// 把以 .jpg 结尾的文件当成一个模块进行声明，之后在本项目中的 .ts 文件内就可以直接导入使用了
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.svg'
declare module '*.gif'

/**
 * 声明命名空间，命名空间名字为 $ 
 * 使用场景：比如我们在 index.html 文件内 通过 CDN 的方式引入了 jQuery ；
 *          如果不在 类型声明文件 内进行声明，则在 .ts 文件内就无法使用 jQuery 中的属性和方法；
 */
declare namespace $ {
  export function ajax(settings: any): any
}