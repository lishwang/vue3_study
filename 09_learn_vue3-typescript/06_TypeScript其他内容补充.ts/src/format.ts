// 单独的模块内（模块化开发）
// 模块内也可以利用命名空间来划分区域；
// 不同的区域也可以定义重名的方法名；
// 命名空间也需要做 export 导出操作，在其他文件内引用后，通过 time.format() 调用；
export namespace time {
  export function format(time: string) {
    return '2022-02-22'
  }

  // 命名空间内也可以定义其他属性或方法，如果这些属性和方法没有进行 export ，
  // 则这些属性和方法只能在这个命名空间内部使用；
  function foo() {}

  let name: string = 'abc'
}

// 同一个模块内定义另一个命名空间
export namespace price {
  export function format(price: number) {
    return '￥99.99'
  }
}