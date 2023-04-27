class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log('person eating')
  }
}

class Student extends Person {
  // 类里面的属性的类型也可以是 可选的（表示赋值为 number | undefined 类型的值均可）
  sno?: number

  constructor(name: string, age: number, sno?: number) {
    // 利用 super 调用父类的 constructor 构造器，给父类里面的属性赋值
    super(name, age)
    this.sno = sno
  }

  eating() {
    // 利用 super 调用父类中的方法
    super.eating()
    console.log('student eating')
  }
}

const stu = new Student('wls', 10)
stu.name = 'wls'
console.log(stu.name)  // wls
console.log(stu.age)  // 10
console.log(stu.sno)  // undefined
stu.eating()  // eating

export {}