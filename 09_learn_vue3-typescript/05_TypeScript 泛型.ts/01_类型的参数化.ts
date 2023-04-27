// - 在定义某些函数时，我们不决定这些参数的类型，而是让调用者以参数的形式告知该函数参数应该是什么类型；

function sum<Type>(num: Type): Type {
  return num
}

// 方式一：<类型> 明确的传入类型
sum<number>(20);
sum<{name: string}>({name: 'wls'});
sum<string[]>(['abc']);

// 方式二：类型推导（默认推导出字面量类型）
sum(60);