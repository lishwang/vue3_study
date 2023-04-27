class Person {
  name: string = ''
  age: number = 10

  eating() {
    console.log('eating')
  }
}

class Student extends Person {
  sno: number = 101

  studying() {
    console.log('studying')
  }
}

class Teacher extends Person {
  title: string = ''

  teaching() {
    console.log('teaching')
  }
}

const stu = new Student()
stu.name = 'wls'
console.log(stu.name)  // wls
console.log(stu.age)  // 10
stu.eating()  // eating

export {}