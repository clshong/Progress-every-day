# Vue的MVVM实现原理

## 几种实现双向绑定的做法

目前am几种主流的 mvc(vm) 框架 都实现了单项数据绑定

双向数据绑定无非就是在单项邦德的基础上给可输入元素（input 、textare等）添加了change（input）时间爱你，来动态修改model个view，并咩有多高深

所以无需介怀是实现的单项或双向绑定

实现数据绑定的做法大致有如下几种：

1. 发布者-订阅者模式（backbone.js）
2. 脏值检查（angular）
3. 数据劫持（vue）

- 发布者订阅者模式
  一般通过 sub、pub的方式实现数据和视图的绑定监听，更新数据通常做法 `vm.set('property', value)`
  比起这样，我们更希望通过 `vm.property = value` 这种方更新数据，同时自动更改视图，
  于是有了下面两种方式
- 脏值检查
  angular 是通过脏值检查的方式 比对数据 是否有变更。来决定 是否 更新 视图，最简单的方式就是 通过 `setInterval()` 定时轮询检测数据变动，
  angular 只有在指定的时间出发时 进入脏值检查，大致如下：

- - DOM事件，譬如用户输入文本、点击按钮等（ng-click）
  - XHR相应事件（$http）
  - 浏览器Location 变更事件（$location）
  - Timer 事件
  - 执行 digst()

- 数据劫持
  vue 采用数据劫持结合发布者订阅者的模式，通过 `Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的静听回调。

## MVVM原理

Vue 的响应式原理最适合的方法便是通过`Object.defineProperty()`来实现对属性的劫持，达到监听数据变动的目的。

要实现 mvvm 的的双向绑定，就必须实现以下几点：

- 实现一个数据监听器 `Observer`，就能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者。
- 实现一个指令解析器 `Compiler` ，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
- 实现一个 `Watcher`， 作为连接 Observer 和 Compiler 的桥梁，能够订阅并接收每个属性变动的通知，执行指定绑定的相应回调函数，从而更新视图。
- MVVM 入口函数，整合以上三者

![img](https://cdn.nlark.com/yuque/0/2021/webp/1378172/1616144025244-ab47da10-fa37-4b0a-991c-b51ea103770b.webp)

[MVVM的实现原理](https://blog.csdn.net/dwfrost/article/details/85777900)