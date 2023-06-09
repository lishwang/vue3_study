class Animal {
  action() {
    console.log('animal running')
  }
}

class Dog extends Animal {
  action() {
    console.log('dog running')
  }
}

class Fish extends Animal {
  action() {
    console.log('fish swimming')
  }
}

// animals: Animal[]  内部属性类型为 Animal 的数组
// 多态的目的是为了写出更加具备通用性的代码
function makeActions(animals: Animal[]) {
  animals.forEach(animal => {
    animal.action()
  })
}

makeActions([new Dog(), new Fish()])