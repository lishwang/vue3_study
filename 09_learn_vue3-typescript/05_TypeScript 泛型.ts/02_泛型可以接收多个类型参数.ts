// ...arg 剩余参数
function foo<T, E>(arg1: T, arg2: E, ...arg: T[]) {

}

foo<number, string>(10, 'abc', 1, 60,);