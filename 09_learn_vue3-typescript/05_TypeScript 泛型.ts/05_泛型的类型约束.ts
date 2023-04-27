// 定义约束的变量及变量的类型
interface ILength {
  length: number
}

// <T extends ILength> 类型约束，一般是用 extends 继承某个接口或者类，在这个接口或类中定义约束的变量和变量的类型；
function getLength<T extends ILength>(arg: T) {
  return arg.length
}

// getLength(123);  // 编译不通过
getLength('456');
getLength([1,2,3]);
getLength({length: 100});