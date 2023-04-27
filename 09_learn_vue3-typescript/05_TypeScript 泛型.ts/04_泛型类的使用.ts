class Point<T> {
  x: T
  y: T
  z: T

  constructor(x:T, y: T, z: T) {
    this.x = x
    this.y = y
    this.z = z
  }
}

// 方法一：不写类型，默认类型推导；
const p1 = new Point('1.1', '2.3', '5.5');

// 方法二：new 一个类的实例的时候在类后面加上泛型；  new 相当于 调用了 Point 这个类的 constructor构造器方法；
const p2 = new Point<string>('1.1', '2.3', '5.5');

// 方法三：声明变量时直接用泛型指定 变量的类型；
const p3: Point<string> = new Point('1.1', '2.3', '5.5');

export {}