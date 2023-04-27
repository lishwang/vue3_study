/**
 * 组合类型：
 * 1、联合类型
 * 2、交叉类型
 */

// 交叉类型
type WType = number & string  // 这样定义接口是有问题的，这样定义的是一个 never 类型，永远不会用到

// const str1: WType = 123;  // 编译报错，因为 WType 是 never 类型
// const str2: WType = '456';  // 编译报错，因为 WType 是 never 类型

// 交叉类型  正确示范
interface ISwim {
  swimming: () => void
}

interface IFly {
  flying: () => void
}

// 实现两个接口中的一个接口的属性和方法即可
type MyType1 = ISwim | IFly
// 实现两个接口中的所有属性和方法
type MyType2 = ISwim & IFly

const obj1: MyType1 = {
  flying() {}
}

const obj2: MyType2 = {
  swimming () {},
  flying () {}
}

export {}
