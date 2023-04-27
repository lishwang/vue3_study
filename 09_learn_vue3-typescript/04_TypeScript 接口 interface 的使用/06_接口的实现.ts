// 定义 ISwim 接口
interface ISwim {
  swimming: () => void
}
// 定义 IEat 接口
interface IEat {
  eating: () => void
}

class Animal {

}

/**
 * extends: 类的继承，只能是单继承；（这个例子中只是用于对比，没有实际意义）
 * implements：由类实现接口，一个类可以实现多个接口；
 */
class Fish extends Animal implements ISwim, IEat {
  // 实现 ISwim 接口
  swimming() {
    console.log('swim')
  }

  // 实现 IEat 接口
  eating() {
    console.log('eat')
  }
}

// 定义一个类似于 ISwim接口 的 类
class Person {
  swimming() {
    console.log('person')
  }
}

// swimActions 方法接收一个类型为 ISwim接口 的参数，同样也可以接收一个 相似于 ISwim接口 的 类或对象 ；
// 所有实现了接口的类对应的对象，都是可以传入的；
// 面向接口编程（使用场景：可以编写一些公共的API）；
function swimActions(swimAble: ISwim) {
  swimAble.swimming()
}

swimActions(new Fish());  // 'swim'
swimActions(new Person());  // 'person'
swimActions({ swimming: () => { console.log(1) } });  // 1