

// 可以执行  ts-node + 文件名  运行该ts文件 *** 

/**
 * 类里面的属性需要做初始化
 * 方法一、在类里面给属性做初始化；
 * 方法二、在constructor构造器里面要求传递对应的属性
 */

class Person {
  name: string = 'wls'
  age: number = 20

  eating() {
    console.log(this.name + 'eating')
  }
}

const p = new Person();
console.log(p.name);
console.log(p.age);
p.eating();



class Student {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + 'eating')
  }
}

const s = new Student('why', 18);
console.log(s.name);
console.log(s.age);
s.eating();
