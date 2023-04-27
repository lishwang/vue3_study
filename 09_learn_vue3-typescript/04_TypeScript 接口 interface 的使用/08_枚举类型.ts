// 枚举类型的值一般用大写
// 看起来这些属性是一些标识的常量，但本质上他们是一些数字常量，默认从 0 开始；也可以给他们设置值，后面的默认依次加一；
// 当然也可以赋值为字符串；
// 枚举也可以作为一种数据类型
enum Direction {
  LEFT = 100,
  RIGHT,
}

function turnDirection(direction: Direction) {
  switch(direction) {
    case Direction.LEFT:
      console.log('Direction.LEFT: ' + Direction.LEFT);  // Direction.LEFT: 100
      break;
    case Direction.RIGHT:
      console.log('Direction.RIGHT: ' + Direction.RIGHT);  // Direction.RIGHT: 101
      break;
    default:
      // never 类型永远不会执行，可以防止代码出错
      const foo: never = direction;
      break;
  }
}

turnDirection(Direction.LEFT);
turnDirection(Direction.RIGHT);