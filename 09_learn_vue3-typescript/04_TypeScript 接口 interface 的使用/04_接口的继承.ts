interface ISwim {
  swimmin: () => void
}

interface IFly {
  flying: () => void
}

// 接口可以实现多继承，相当于把多个接口合并到一起
interface IAction extends ISwim, IFly {

}

// 使用多继承的接口时，需要实现每个接口中的所有属性和方法
const action: IAction = {
  swimmin () {
    
  },
  flying () {
    
  },
}

export {}