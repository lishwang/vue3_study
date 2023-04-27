// 通过 interface 接口来定义索引类型
interface IndexLanguage {
  [index: number]: string
}

// 指定索引类型之后，对象的 属性及属性值 的类型就必须统一
const frontLanguage: IndexLanguage = {
  0: 'HTML',
  1: 'css',
  2: 'JavaScript',
  3: 'vue',
  // 'aa': 'aa', // 编译报错
}