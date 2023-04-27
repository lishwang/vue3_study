// 写法一：
// <T1, T2> 接口 IPerson 接收类型参数
interface IPerson<T1, T2> {
  name: T1,
  age: T2
}

// <string, number> 给接口 IPerson 传递类型参数
const p: IPerson<string, number> = {
  name: 'wls',
  age: 18
}

// 写法二：
// 也可以给 接口 IPerson 设置默认接收类型参数
interface IPerson2<T1 = string, T2 = number> {
  name: T1,
  age: T2
}

// 接口 IPerson 的参数设置了默认接收类型，就不需要传递参数类型
const p2: IPerson2 = {
  name: 'wls',
  age: 18
}