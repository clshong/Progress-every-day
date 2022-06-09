大家好！在这篇简短的文章中，我们将讨论JavaScript 中的**原型继承**，以及它的含义。

# Intro

你有没有想过字符串、数组或对象如何“知道”它们各自拥有的方法？字符串如何知道它可以`.toUpperCase()`或数组如何知道它可以`.sort()`？我们从来没有手动定义过这些方法，对吧？

答案是这些方法内置在每种类型的数据结构中，这要归功于称为**原型继承**的东西。

在 JavaScript 中，一个对象可以继承另一个对象的属性。继承属性的对象称为原型。简而言之，对象可以从其他对象（原型）继承属性。

您可能想知道：为什么首先需要继承？好吧，继承解决了数据和逻辑重复的问题。通过继承，对象可以共享属性和方法，而无需在每个对象上手动设置这些属性和方法。

## How to Accessa Prototype’s Properties and M ethods  in JavaScript

当我们尝试访问对象的属性时，不仅在对象本身中搜索该属性。它还在对象的原型中搜索，在原型的原型中，等等 - 直到找到与名称匹配的属性或到达**原型链**的末尾。

如果在原型链中的任何地方都找不到属性或方法，那么 JavaScript 才会返回`undefined`.

JavaScript 中的每个对象都有一个名为`[[Prototype]]`.

如果我们创建一个数组并将其记录到控制台，如下所示：

```
const arr = [1,2,3]
console.log(arr)
```

我们将看到：

![图片](https://www.freecodecamp.org/news/content/images/2022/05/image.png)

括起来的双方括号`[[Prototype]]`表示它是一个内部属性，不能在代码中直接访问。

为了找到`[[Prototype]]`一个对象，我们将使用`Object.getPrototypeOf()`方法。

```
const arr = [1,2,3]
console.log(Object.getPrototypeOf(arr))
```

输出将包含几个内置属性和方法：

![图像-1](https://www.freecodecamp.org/news/content/images/2022/05/image-1.png)

请记住，原型也可以通过不同的方法进行更改和修改。**原型\**链\**\**_\** _ \**_\****

在原型链的末端是`Object.prototype`. 所有对象都继承了 的属性和方法`Object`。任何超出链末端的搜索尝试都会导致`null`.

如果您查找数组、函数或字符串的原型的原型，您会发现它是一个对象。这是因为在 JavaScript 中，所有对象都是 的后代或实例`Object.prototype`，这是一个为所有其他 JavaScript 数据类型设置属性和方法的对象。

```
const arr = [1,2,3]
const arrProto = Object.getPrototypeOf(arr)
console.log(Object.getPrototypeOf(arrProto))
```

![图像-2](https://www.freecodecamp.org/news/content/images/2022/05/image-2.png)

每种类型的原型（例如数组原型）都定义了自己的方法和属性，并且在某些情况下会覆盖`Object.prototype`方法和属性（这就是数组具有对象没有的方法的原因）。

但是在底层，沿着原型链的阶梯向上爬，**JavaScript 中的一切都是建立在`Object.prototype`.**

如果我们尝试查看**`Object.prototype`** 我们得到的原型`null`。

```
const arr = [1,2,3]
const arrProto = Object.getPrototypeOf(arr)
const objectProto = Object.getPrototypeOf(arrProto)
console.log(Object.getPrototypeOf(objectProto))
```

![图像-3](https://www.freecodecamp.org/news/content/images/2022/05/image-3.png)

## A Prototype-Based Language

JavaScript 是一种**基于原型的语言**，这意味着可以通过具有克隆和扩展能力的通用对象来共享对象属性和方法。

在继承方面，JavaScript 只有一种结构：对象。

每个对象都有一个私有属性（称为 its `[[Prototype]]`），它维护到另一个对象的链接，称为它的原型。该原型对象有自己的原型，以此类推，直到`null`到达其原型的对象。

根据定义，`null`它没有原型，并且充当这个原型链中的最后一环。

这称为原型继承，与类继承不同。在流行的面向对象编程语言中，JavaScript 是比较独特的，因为 PHP、Python 和 Java 等其他著名语言是基于类的语言，它们将类定义为对象的蓝图。

此时您可能会想“但我们可以在 JavaScript 上实现类！”。是的，我们可以，但作为语法糖。🤫🤔

## Javascript Classes

类是一种设置蓝图以创建具有预定义属性和方法的对象的方法。通过创建具有特定属性和方法的类，您可以稍后从该类实例化对象，这些对象将继承该类具有的所有属性和方法。

在 JavaScript 中，我们可以通过以下方式创建类：

```
class Alien {
    constructor (name, phrase) {
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayPhrase = () => console.log(this.phrase)
}
```

然后我们可以像这样从该类实例化一个对象：

```
const alien1 = new Alien("Ali", "I'm Ali the alien!")
console.log(alien1.name) // output: "Ali"
```

类被用作使代码更加模块化、组织化和易于理解的一种方式，并且在 OOP 编程中大量使用。

但请记住，JavaScript 并不像其他语言那样真正支持类。关键字是 ES6 中引入的`class`，作为促进这种组织代码方式的语法糖。

为了可视化这一点，看看我们之前定义 a 所做的相同的事情`class`，我们可以通过定义一个函数并按以下方式编辑原型来做到这一点：

```
function Alien(name, phrase) {
    this.name = name
    this.phrase = phrase
    this.species = "alien"
}

Alien.prototype.fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
Alien.prototype.sayPhrase = () => console.log(this.phrase)

const alien1 = new Alien("Ali", "I'm Ali the alien!")

console.log(alien1.name) // output "Ali"
console.log(alien1.phrase) // output "I'm Ali the alien!"
alien1.fly() // output "Zzzzzziiiiiinnnnnggggg"
```

任何函数都可以使用关键字作为构造函数调用，`new`并且该函数的原型属性用于对象继承方法。在 JavaScript 中，“类”仅在概念上用于描述上述实践——从技术上讲，它们只是函数。😑

尽管这不一定有很大的不同（我们仍然可以完美地实现 OOP 并像在大多数其他编程语言中一样使用类），但重要的是要记住 JavaScript 的核心是原型继承。