/**
 * 类的只读属性 readonly
 * 只读属性是可以在构造器或者直接赋初始值的，但是赋值之后不可以再次修改；
 * 只读属性本身不能被修改，但是，如果它是引用类型，其内部的属性是可以被修改的；（类似于 const 定义引用类型）
 */

 class Person {
	readonly name: string
	age?: number
	readonly friend?: Person
	 
	constructor(name: string, friend?: Person) {
		this.name = name
		this.friend = friend
	}
}

const p = new Person('wls', new Person('why'));
console.log(p.name);  // 'wls'
console.log(p.friend);  // { name: 'why', friend: undefined }

// 不可以直接修改 p.friend ,因为是 只读 属性
// p.friend = new Person('james');
// 但是可以修改只读属性内部的属性
if (p.friend) {
	p.friend.age = 18
}

// 类似于 const 
const obj = { name: 'www', age: 18 };
obj.age = 20

export {}