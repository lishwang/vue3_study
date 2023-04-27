##### createApp

![createApp](.\vue3原码\createApp.png)



##### 挂载根组件![挂载根组件](.\vue3原码\挂载根组件.png)

![挂载根组件（2）](.\vue3原码\挂载根组件（2）.png)



##### 组件的初始化

![组件的初始化](.\vue3原码\组件的初始化.png)



##### instance 组件实例的创建和属性赋值

![instance 组件实例的创建和属性赋值](.\vue3原码\instance 组件实例的创建和属性赋值.png)



##### compile 过程（编译器）

- 原理：将 template 模板 转化成 render 函数![compile 过程（编译器）](.\vue3原码\compile 过程（编译器）.png)

- 编译器生成的 render 函数（template =》 render函数）

![编译器生成的 render 函数](.\vue3原码\编译器生成的 render 函数.png)



##### 生命周期回调

![生命周期回调](.\vue3原码\生命周期回调.png)



##### vue3 中的取值顺序

- 缓存 => setup => data => props => computed、methods => 找不到；

![vue3 中的取值顺序](.\vue3原码\vue3 中的取值顺序.png)