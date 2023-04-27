/**
 * 在 TypeScript 中，类的属性和方法支持三种修饰符： public 、 private 、 protected  ;
 * 1、 public 修饰是在任何地方可见、公有的属性或方法，默认编写的属性就是 public 的；
 * 2、 private 修饰的属性和方法，只能在这个类的内部才能访问，其 实例 和 子类 中均不能访问，但是可以通过 这个类 内部封装的方法来获取或改变该属性；
 * 3、 protected 修饰的属性或方法，只能在这个类和其子类内部访问，也是只能通过其内部或其子类内部内部封装的方法来获取或改变该属性；
 */


// private

// class Person {
// 	private name: string = ''
	
// 	// 封装方法来访问 name
// 	getName() {
// 		return this.name
// 	}
// 	// 封装方法来修改 name
// 	setName(newName) {
// 		this.name = newName
// 	}
// }
// const p = new Person()
// p.setName('why')
// // p.name;   // 编译不通过


// protected

// 1、利用构造器给属性赋值
// class Person {
// 	protected name: string
// 	constructor(name: string) {
// 		this.name = name;
// 	}
// }

// class Student extends Person {
// 	constructor(name: string) {
// 		super(name)
// 	}
	
// 	getName() {
// 		return this.name
// 	}
// }

// const stu = new Student('wls');
// console.log(stu.getName());

// 2、给类中的属性直接赋初始值
class Person {
	protected name: string = 'wls'
}

class Student extends Person {
	getName() {
		return this.name
	}
}

const stu = new Student();
console.log(stu.getName());

export {}