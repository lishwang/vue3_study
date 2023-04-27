class Person {
	private _name: string
	constructor(name: string) {
		this._name = name
	}
	
	set name(newName) {
		this._name = newName
	}
	get name() {
		return this._name
	}
}

const p = new Person('wls');
// 通过访问器 setter 可以直接修改类内部通过 private 修饰的属性
p.name = 'why';
// 通过访问器 getter 可以直接访问类内部通过 private 修饰的属性
console.log(p.name);

export {}