class Person {
  name: string = '123'
  eating() {}
}

// 要求传入一个 Person类 的类型的参数
function printPerson(p: Person) {
  console.log(p.name)
}

// 正常传参
printPerson(new Person());  // '123
// 也可以传入一个与Person类相似的对象
printPerson({name: 'kobe', eating: function() {}});  // 'kobe