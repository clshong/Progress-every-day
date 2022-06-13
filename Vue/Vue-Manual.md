## 1.框架和库的区别：

框架（framework）：有着自己的语法特点、都有对应的各个模块
库（library）：专注于一点

框架的好处：

```plain
1.提高代码的质量和开发的速度
2.提高代码的复用率
3.降低模块之间的耦合度（高内聚低耦合）
```

几个概念：

```plain
UI  : user interface
GUI : graphical user interface
CLI : command line interface
API : application interface
```

思维模式的转换：

```plain
从操作DOM的思维模式 切换到 以数据为主
```

## 2.Vue概述

```plain
1、what    
    是一个渐进式的构建用户界面的js框架
2、where
    小到的简单的表单处理，大到复杂的数据操作比较频繁的单页面应用程序
3、why
    1.方便阅读的中文文档
    2.容易上手 （学习曲线比较缓和）
    3.体积小
    4.基于组件化的开发方式
    5.代码的可读性、可维护性得到了提高
4、how
    工作方式：可以通过丰富的指令扩展模板，可以通过各种各样的插件来增强功能
    搭建环境：
    方式1
        # 全局安装 vue-cli
        $ npm install --global vue-cli
        # 创建一个基于 webpack 模板的新项目
        $ vue init webpack my-project
        # 安装依赖，走你
        $ cd my-project
        $ npm install
        $ npm run dev
    方式2:
        直接引入对应的js文件
```

## 3.Vue中基础知识

```plain
1、双花括号
    mustache(胡子)/interpolation（插值表达式）
    语法：
    <any>{{表达式}}</any>
    作用：
    将表达式执行的结果 输出当调用元素的innerHTML中；还可以将数据绑定到视图
    
2、指令-循环指令
    基本语法1：
    <any v-for="tmp in array"></any>
    基本语法2：
    <any v-for="(value,index) in array"></any>
    作用：
    在遍历array这个集合时，将临时变量保存在tmp中，创建多个any标签
    
3、指令-选择指令
    语法：
      <any v-if="表达式"></any>
      <any v-else-if="表达式"></any>
      <any v-else="表达式"></any>
    作用：
      根据表达式执行结果的真假，来决定是否要将当前的这个元素 挂载到DOM树
      
4、指令-事件绑定
    语法：
        <any v-on:eventName="handleEvent"></any>
    作用：
        给指定的元素 将handleEvent的方法绑定给指定eventName事件
    
5、指令-属性绑定
  基本语法：
    <any v-bind:myProp="表达式"></any>
    补充，支持简写：
    <any :myProp="表达式"></any>
  作用：
    将表达式执行的结果 绑定 到当前元素的myProp属性
    <img v-bind:src="'img/'+myImg" alt="">
   动态样式绑定
    <p :style="{backgroundColor:myBGColor}">动态样式绑定</p>
   动态样式类绑定
      <h1 :class="{myRed:false}">动态样式类的绑定</h1>
      
6、指令-双向数据绑定
    方向1：数据绑定到视图
    方向2：将视图中（表单元素）用户操作的结果绑定到数据
    基本语法:
      <表单元素 v-model="变量">
      </表单元素>
```

## 4.组件化

```plain
组件：组件就是可被反复使用的，带有特定功能的视图
所谓的组件化，就像玩积木一样，把封装的组件进行复用,把积木（组件）拼接在一起，构成一个复杂的页面应用程序。
组件树就是由各个组件构成的一种数据结构，它存在的意义是为了帮梳理应用程序

1、组件的创建
  全局组件
    Vue.component('my-com',{
      template:`
        <h2>it is a header</h2>
      `
    })
      局部组件
    new Vue({
        components:{
            'my-footer':{
           template:''
         }
        }
    })
    
2、组件使用
    作为普通的标签去使用
    <my-com></my-com>
    
3、注意事项
    1.组件的id和使用方式 遵循烤串式命名方式：a-b-c 
    2.如果一个组件 要渲染多个元素，将多个元素放在一个顶层标签中，比如div、form
    3.全局组件可以用在id为example的范围内的任何一个组件内部，直接调用可以；但是局部组件只能在父模板中直接调用
```

## 5.自定义指令

```plain
1、创建和使用
 Vue.directive('change',{
    bind:function(el,bindings){
    //首次调用
    },
    update:function(el,bindings){
    //只要是有数据变化，都会调用
    },
    unbind:function(){
    //解绑
    }
 })
 <any v-change="count"></any>
```

## 6.过滤器

过滤器是针对一些数据 进行筛选、过滤、格式化等相关的处理，变成我们想要的数据

过滤器的本质 就是一个带有参数带有返回值的方法

Vue1. *支持内置的过滤器，但是Vue2.* 就不再内置过滤器，但是支持自定义过滤器。

1、过滤器的创建和使用

```plain
1.创建
   Vue.filter(
    'myFilter',
    function(myInput){
       //myInput是在调用过滤器时，管道前表达式执行的结果
       //针对myInput，按照业务需求做处理
       //返回
       return '处理后的结果'
    })
    
2.使用
    <any>{{expression | myFilter}}</any>
```

2、如何在调用过滤器时，完成参数的发送和接受

```plain
1.发送
<any>{{expression | myFilter(参数1，参数2)}}</any>

2.接受
Vue.filter('myFilter',function(myInput，参数1，参数2){
    return '处理后的结果'
})
```

## 7.复合组件

```plain
知识回顾：
  Vue.component('my-header',{
    template:`<div></div>`
  });
  <my-header></my-header>
  
 复合组件：并不是新的概念，就是一个组件，只不过这个组件中 可以调用其他的组件
 
 注意事项：
  1.组件要渲染的内容 取决于在定义组件时template
  <my-list>
    <my-item></my-item>
  </my-list>
  效果是出不来的
  2.允许在一个组件中，直接来调用另外一个组件
```

## 8.生命周期

```plain
四个阶段：
    create 准备工作 （数据的初始化）
    mount  挂载前后针对元素进行操作
    update 数据发生变化，
    destroy 清理工作 (关闭定时器、集合清空...)
    beforeCreate/created
    beforeMount/mounted
    beforeUpdate/updated
    beforeDestroy/destroyed
```

## 9.常用属性

```plain
1、watch
   1. 表单元素的双向数据绑定
   		v-model="myValue"
   2.监听
    watch:{
      myValue:function(newValue,oldValue){ }
    }
    
2、computed
    计算属于是用于在模板中，搞定复杂的业务逻辑，因为有依赖缓存。
    1.指定计算属性
        computed:{
          myHandle:function(){
           return 数据
          }
        }
    2.调用
        <any>{{myHandle}}</any>
```

## 10.组件间通信

```plain
1、父与子通信 （props down）
    1.发送
        <son myName='zhangsan'>
        </son>
    2.接受
        到son组件：
        Vue.component('son',{
          props:['myName'],
          template:`
           <p>{{myName}}</p>
          `
        })
    
2、子与父通信 (events up)
     1.绑定
    methods:{
     handleEvent:function(msg){}
    }
    <son @customEvent="handleEvent"></son>
    2.触发
    子组件内部：
    this.$emit(‘customEvent’,100);
3、ref(reference 引用/参考 外号)
 帮助在父组件中 得到子组件中的数据、方法。
    1.指定ref属性
    <son ref="mySon"></son>
    2.根据ref得到子组件实例
    this.$refs.mySon
4、$parent
    this.$parent得到父组件的实例
5、兄弟组件通信
    1.var bus = new Vue();
    2.接收方
    bus.$on('eventName',function(msg){})
    3.发送方
    bus.$emit('eventName',123);
```

## 11.补充组件创建的方式

```plain
1、直接在template属性中指定模板内容
    1.全局组件
    Vue.component
    2.局部组件
    {
      components:{
        'my-footer'：{template:``}
      }
    }
2、.vue结尾的文件
    <template></template>
    <script></script>
    <style></style>
3、单独指定一个模板内容
    <script
    id='myContent'
    type='text/x-template'>
    </script>
    Vue.component('',{
      template:'#myContent'
    })
```

## 12.路由模块

路由模块的本质 就是建立起url和页面之间的映射关系

1、SPA的基本概念和工作原理

```plain
SPA：single page application 单一页面应用程序，只有一个完整的页面；
它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。
比如Gmail、移动的webApp
工作原理：
1.解析地址栏 
    完整的页面地址、路由地址
2.根据路由地址 从路由词典中找到真正的要加载的页面
3.发起ajax请求 
    请求要加载的页面
4.像指定的容器中 插入加载来的页面
```

2、路由模块的基本使用

```plain
专业术语： 
    router路由器 
    route路由
    routes 路由数组（路由词典）
1.引入vue.js vue-router.js
2.指定一个容器
<router-view></router-view>
3.创建业务所需要用到的组件类
        var MyLogin = Vue.component()
4.配置路由词典
 const myRoutes = [
  {path:'',component:MyLogin},
  {path:'/login',component:MyLogin}
 ];
 const myRouter = new VueRouter({
  routes:myRoutes
 })
 new Vue({
   router:myRouter
 })
5.测试
    修改地址栏中的路由地址，测试看加载的组件是否正确
注意事项：
 1.先引入vue，再引入插件
 2.一定要指定router-view
 3.route路由 {path:'',component:}
  routes 路由数组 []
  router 路由器:按照指定的路由规则去访问对应的组件 new VueRouter
```

3、使用路由模块来实现页面跳转的方式

```plain
方式1：直接修改地址栏
方式2：js
this.$router.push(‘路由地址’);
方式3：
 <router-link 
 to="路由地址"></router-link>
```

4、完成参数的传递

```plain
在页面之间跳转的时候，在有些场景下，需要同时指定参数
1.明确发送方和接收方
list --20--> detail
1.配置接收方的路由地址
/detail --> /detail/:index
this.$route.params.index
2.发送
routerLink to="/detail/20"
this.$router.push('/detail/20')
```

5、路由嵌套

```plain
在一个路由中，path对应一个component，如果这个component需要根据
不同的url再加载其他的component，称之为路由的嵌套
举例：比如A组件现在需要根据不同的url，加载B组件或者C组件
1.给A组件指定一个容器
  <router-view></router-view>
2.配置路由词典
  {
    path:'/a',
    component:A,
    children:[
      {path:'/b',component:B}
    ]
  }
  需求：现在有两个组件，分别是login/mail,建立SPA。
  在此基础上，希望mail组件 嵌套inbox/outbox/draft
  补充：在设置子路由，路由匹配规则依然是适用的，
  只不过路由地址为空和异常，要携带父组件的路由地址
  /mail /mail/draft
```