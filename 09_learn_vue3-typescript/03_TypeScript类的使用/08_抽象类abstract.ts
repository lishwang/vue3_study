function makeArea(shape: Shape) {
  return shape.getArea();
}

// 定义抽象类，抽象类不能被实例化
abstract class Shape {
  // 对于有些父类中的需要定义的函数，但是又不能有实现体的函数，我们一般把这种函数定义为抽象函数
  // 定义抽象函数，抽象函数只能定义在抽象类内部，抽象函数是可以没有函数体的
  abstract getArea(): number;
}

class Rectangle extends Shape {
  private width: number
  private height: number

  constructor(width: number, height: number) {
    // 继承时，子类的constructor构造器中必须要调用 super() ，无论父类中有没有属性
    super()
    this.width = width
    this.height = height
  }

  // 抽象类中的抽象方法必须被子类实现（重写）
  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  private r: number

  constructor(r: number) {
    super()
    this.r = r
  }

  getArea () {
    return this.r * this.r * 3.14
  }
}

const rectangle = new Rectangle(20, 30);
const circle = new Circle(10);

console.log(makeArea(rectangle))
console.log(makeArea(circle))
// makeArea(new Shape()); // 编译报错，抽象类不能被实例化