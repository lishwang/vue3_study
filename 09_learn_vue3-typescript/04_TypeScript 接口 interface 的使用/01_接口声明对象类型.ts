/**
 * 声明一个对象类型可以用 type 定义别名，也可以用 接口 interface 
 * 接口 声明对象类型中可以定义可选类型、也可以定义只读属性
 */

// 方法一：type 定义别名
// type InfoType = {
//   readonly name: string,
//   age: number,
//   friend?: {
//     name: string
//   }
// }

// 方法二：接口 声明对象类型（类似于 class 创建类，类也是一种类型）
interface InfoType {
  readonly name: string
  age: number
  friend?: {
    name: string
  }
}

const info: InfoType = {
  name: 'wls',
  age: 20,
  friend: {
    name: 'kobe'
  }
}

// info.name = '999';  // 只读属性不能被修改，注意与类中的只读属性做区分
info.age = 30;
console.log(info.friend?.name);  // 'kobe'