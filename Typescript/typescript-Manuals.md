### TypeScript 介绍

- [TypeScript 官方文档](https://www.typescriptlang.org/)
- **TypeScript** **简称：TS，是 JavaScript 的超集**，简单来说就是：JavaScript 有的 TypeScript 都有

其实所有都是官网上能找到的，只是在使用过程中有些疑问的地方整理了下，能让自己更快查找到相应的点。这里还发现一篇宝藏文章 -https://juejin.cn/post/6872111128135073806 大佬整理的超级仔细，这篇文章是我根据自身使用跟官网在参考了大佬的文档进行了总结。

### 基础类型

简单来说，就是对变量进行类型的定义，这样子在编译的时候就可以发现是否有类型错误了

```javascript
//布尔类型
let isDone:boolean =false;
//数字类型
let age:number=6
// 字符串类型
let mystring:string='test'
//数组  
let myarr:number[]=[1,2,3,4]
//枚举
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;   
console.log(c) //2
//any 
就是可以为任何类型
let notSure:any=4
// void  不返回类型 
const voidfun:=():void={}
//null 和undefined
let u:undefined=undefined;
let n:null=null
// never  never类型表示的是那些永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {
    }
}
//unknown类型  所有类型都可以赋值给unknown unknown 类型只能被赋值给 any 类型和 unknown 类型本身
```



### 函数类型



其实就是定义了传入的参数格式跟返回值格式，不过语法稍微有点怪



```javascript
let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId;
```



### 泛型



需要一种种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 *类型变量*，它是一种特殊的变量，只用于表示类型而不是值。简单来说，我暂时不知道类型是什么，用一个T代指，当第一个T的变量类型确认后，内部所有引用T的地方都也确定了。



```javascript
function identity<T>(arg: T): T {
    return arg;
}

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

function test<T>(args:T):T {
    return  args
}
test<string>('test')
```



泛型函数，注意格式，包裹参数的类型定义跟函数输出的类型定义



```javascript
function identity<T>(arg: T): T {
    return arg;
}

//这个写法是什么鬼
let myIdentity: <T>(arg: T) => T = identity;
//其实就是let myIdentity=identity <T>（arg:T）=>T代表的就是输入类型跟输出

//因此可以写成接口
interface GenericIdentityFn {
    <T>(arg: T): T;
}
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn = identity;
```



泛型约束-先去搞清楚继承,合并了{length}，等于必须要有.length



```javascript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

多个泛型,代表多种类型定义，然后在返回值跟参数中可以定义到不同的泛型,但是未实现的泛型就会一直有问题，所以其实都需要定义好的泛型来。例如假设我在某个泛型的后面进行了.length的操作，但是这个泛型有可能是number,boolean，这些类型并没有.length的属性，便会报错。

```javascript
//针对上述的操作有是三种方法
1. 即上面那种直接继承另一个存在.length的接口
2. 通过判断
if(typeof args==='string'){return arg.length}
3. 类型断言
(args as string).length
```

多个泛型的时候，注意返回类型

```javascript
function test<T, K>(args:T,arg2:K):T|K{
  return args&&arg2
}

test<boolean,string>(true,'test')
```

还有种最典型的，获取对象的key-用extends keyof，返回的是对象所有值的一个数组

```javascript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

### 接口

接口其实就是对于对象的定义,接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

interface 就是对参数 函数 数组 类 的限制

```javascript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});

//只读属性-不准修改
interface Point {
    readonly x: number;
    readonly y: number;
}
```

函数类型

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。函数类型接口

```plain
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```



可索引类型

```javascript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

接口继承，即合并属性

```javascript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

implement

```javascript
interface test{}
class newTest implements test{
 //即代表这个类必须实现test接口
}
```

### 类型断言

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。意思就是我觉得这个类型是什么！

```javascript
//两种形式
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```



### 类型守卫

确保类型在一定范围内。其主要思想是尝试检测属性、方法或原型，以确定如何处理值。例如定义了一个类型为数组或者字符串，我们需要对不同类型进行不同的操作

```javascript
1. in关键字
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
 
2. typeof
3. instanceof
  
 原理同上-进行类型的判断再进行操作
```

### type

type跟interface的区别

https://www.jb51.net/article/163299.htm

其实两者都可以进行声明对象跟函数定义（参数跟返回值）

```javascript
interface User {
 name: string
 age: number
}
 
interface SetUser {
(name: string, age: number): void;
}

type Name = { 
 name: string; 
}
interface User extends Name { 
 age: number; 
}
```

```javascript
type UnneedProps =
  'showSearch'
  | 'onSearch'
    | 'tokenSeparators'

let aa:UnneedProps='showSearch'
let bb:UnneedProps='test' //报错-就是定义了一个字符串的值只能为这几个

// 基本类型别名
type Name = string
 
// 联合类型
interface Dog {
 wong();
}
interface Cat {
 miao();
}
 
type Pet = Dog | Cat
 
// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

interface Name { 
 name: string; 
}
type User = Name & { 
 age: number; 
}
```

### 通用类型

计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。

### 高级类型

交叉类型-将多个类型合并为一个类型，包含了所需的所有类型

```javascript
const hightyep=Person&Log
interface Person{
  name:string
}
interface Log{
  log:string
}
const test: Person & Log = {
  name: 'test',
  log:'log'
}
```

联合类型表示一个值可以是几种类型之一。 我们用竖线（ `|`）分隔每个类型，所以 `number | string | boolean`表示一个值可以是 `number`， `string`，或 `boolean`。**如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员**。

所以使用联合类型的时候,可以使用类型保护。

```javascript
interface Test1{
    test1:number
}

interface Test2{
    test2:string
}
//类型保护
1. 类型断言
function test(args: Test1 | Test2) {
   return (args as Test1).test1
}
2. in语法
function test(args: Test1 | Test2) {
    if ('test1' in args) {
        return args.test1
    }
}
3. 用typeof 判断
function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}
4. instanceof 
  // instanceof 语法，只能用在类上
class NumberObj {
  count: number;
}
function addObj(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
```

如果编译器不能够去除 `null`或 `undefined`，你可以使用类型断言手动去除。 语法是添加 `!`后缀： `identifier!`从 `identifier`的类型里去除了 `null`和 `undefined`：

### 类型别名

类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。

```javascript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```

字面量类型

```javascript
type Easing = "ease-in" | "ease-out" | "ease-in-out";
```

### keyof

`keyof` 与 `Object.keys` 略有相似，只不过 `keyof` 取 `interface` 的键。

```javascript
interface Point {
    x: number;
    y: number;
}

// type keys = "x" | "y"
type keys = keyof Point;
```

### Pick

其实就是从一个接口中选择部分属性。

```javascript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

type Pick<T, K extends keyof T> = {
	[key in k]: T[key]
}
```

### Omit

与pick相反，删除接口中的部分属性

```javascript
type User = {
id: string;
name: string;
email: string;
};

type UserWithoutEmail = Omit<User, "email">;

// 等价于:
type UserWithoutEmail = {
id: string;
name: string;
};
```

### Partial

`Partial<T>` 的作用就是将某个类型里的属性全部变为可选项 `?`。

```javascript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "Learn TS",
  description: "Learn TypeScript",
};

const todo2 = updateTodo(todo1, {
  description: "Learn TypeScript Enum",
});
```

### tsconfig.json

- files - 设置要编译的文件的名称；
- include - 设置需要进行编译的文件，支持路径模式匹配；
- exclude - 设置无需进行编译的文件，支持路径模式匹配；
- compilerOptions - 设置与编译流程相关的选项。

```javascript
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

### 类型重载

类似于c#的方法重写，同名方法的参数类型不同。可以进行不同的类型返回

```javascript
const test=(value:string)=>number
const test=(value:number)=>string
```



### d.ts  -模块声明，类型定义

主要用于为第三方库编写相应的类型声明。

https://www.cnblogs.com/xgqfrms/p/12460879.html

https://zhuanlan.zhihu.com/p/58123993?utm_source=wechat_session