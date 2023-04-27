interface IPerson {
  name: string
  age: number
}

// 编译正常
// const p: IPerson = {
//   name: 'wls',
//   age: 18,
// }

// 编译失败
// 原因：初始化变量p时，可以通过p的属性值（字面量）来直接推导出p的类型，
//       如果定义该变量的类型IPerson与系统默认推导出的类型不一致，就会出现编译不通过；
// const p: IPerson = {
//   name: 'wls',
//   age: 18,
//   friend: 'kobe',
// }


// 编译正常
// 解决方案：给p变量赋值前，可以先给定义一个常量Pinfo，把值先赋值给Pinfo，然后把Pinfo的引用Pinfo再赋值给p；
// 原理：把常量Pinfo的引用Pinfo赋值给p后，系统会默认做一个 freshness 擦除 的操作，
//      就是，当把常量的引用Pinfo赋值给p后，它会跟定义p的类型IPerson做一个对比，
//      然后去除掉多余的属性 friend: 'kobe'(不是真正的去掉，不修改原对象中的值)，
//      如果满足当前定义的类型IPerson，就编译通过；
const Pinfo = {
  name: 'wls',
  age: 18,
  friend: 'kobe',
}
const p: IPerson = Pinfo;


// 场景二：函数的形参
interface IPerson {
  name: string
  age: number
}

function printInfo(person: IPerson) {
  console.log(person.name);
  // console.log(person.friend); // 永远都是 编译不通过，因为在类型检测的时候，默认只有 IPerson 类型中的属性可以通过编译
}

// 编译失败
// printInfo({
//   name: 'wls',
//   age: 18,
//   friend: 'kobe',
// })

// 编译成功
const Pinfo2 = {
  name: 'wls',
  age: 18,
  friend: 'kobe',
}
printInfo(Pinfo2)