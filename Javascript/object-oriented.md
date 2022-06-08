# Understanding of object-oriented programming



大家好！在本文中，我们将通过实际的 JavaScript 示例来回顾面向对象编程 (OOP) 的主要特征。

我们将讨论 OOP 的主要概念，为什么以及什么时候它有用，我会给你很多使用 JS 代码的例子。

如果你不熟悉编程范式，我建议你在深入研究之前先看看[廖雪峰Javascript教程](https://www.liaoxuefeng.com/)

# Intro to Object-Oriented Programming

实体被编码为**对象**， 每个实体将分组一组给定的信息（**属性**）和可由实体执行的动作（**方法）。**

OOP 在大型项目中非常有用，因为它有助于代码模块化和组织。

通过实现实体的抽象，我们能够以与我们的世界工作类似的方式来考虑程序，不同的参与者执行某些操作并相互交互。

为了更好地理解如何实现 OOP，我们将使用一个实际示例来编写一个小型视频游戏。我们将专注于角色的创建，看看 OOP 如何帮助我们。

# How to Create Objects – Classes

所以任何电子游戏都需要角色，对吧？并且所有角色都有一定的**特征**（属性），如颜色、身高、名字等，以及**能力**（方法）如跳跃、奔跑、拳击等。对象是用于存储此类信息的完美数据结构。

假设我们有 3 个不同的角色“物种”可用，我们想要创建 6 个不同的角色，每个物种 2 个。

创建我们的角色的一种方法可能是使用[对象文字手动创建对象，](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)以这种方式：

```
const alien1 = {
    name: "Ali",
    species: "alien",
    phrase: () => console.log("I'm Ali the alien!"),
    fly: () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}
const alien2 = {
    name: "Lien",
    species: "alien",
    sayPhrase: () => console.log("Run for your lives!"),
    fly: () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}
const bug1 = {
    name: "Buggy",
    species: "bug",
    sayPhrase: () => console.log("Your debugger doesn't work with me!"),
    hide: () => console.log("You can't catch me now!")
}
const bug2 = {
    name: "Erik",
    species: "bug",
    sayPhrase: () => console.log("I drink decaf!"),
    hide: () => console.log("You can't catch me now!")
}
const Robot1 = {
    name: "Tito",
    species: "robot",
    sayPhrase: () => console.log("I can cook, swim and dance!"),
    transform: () => console.log("Optimus prime!")
}
const Robot2 = {
    name: "Terminator",
    species: "robot",
    sayPhrase: () => console.log("Hasta la vista, baby!"),
    transform: () => console.log("Optimus prime!")
}
```

看到所有字符都有`name`and`species`属性和`sayPhrase`方法。而且，每个物种都有一个只属于那个物种的方法（例如，外星人有这个`fly`方法）。

如您所见，有些数据是所有角色共享的，有些数据是每个物种共享的，有些数据是每个角色独有的。

这种方法有效。看到我们可以像这样完美地访问属性和方法：

```
console.log(alien1.name) // output: "Ali"
console.log(bug2.species) // output: "bug"
Robot1.sayPhrase() // output: "I can cook, swim and dance!"
Robot2.transform() // output: "Optimus prime!"
```

这样做的问题是它根本不能很好地扩展并且容易出错。想象一下，我们的游戏可能有数百个角色。我们需要手动设置它们的属性和方法！

为了解决这个问题，我们需要一种编程方式来创建对象并在给定一组条件的情况下设置不同的属性和方法。这就是**类**的好处。

类设置了一个蓝图来创建具有预定义属性和方法的对象。通过创建一个类，您可以稍后从**该类实例化**（创建）对象，这将继承该类具有的所有属性和方法。

重构我们之前的代码，我们可以为每个角色创建一个类，如下所示：

```
class Alien { // Name of the class
    // The constructor method will take a number of parameters and assign those parameters as properties to the created object.
    constructor (name, phrase) {
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    // These will be the object's methods.
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayPhrase = () => console.log(this.phrase)
}

class Bug {
    constructor (name, phrase) {
        this.name = name
        this.phrase = phrase
        this.species = "bug"
    }
    hide = () => console.log("You can't catch me now!")
    sayPhrase = () => console.log(this.phrase)
}

class Robot {
    constructor (name, phrase) {
        this.name = name
        this.phrase = phrase
        this.species = "robot"
    }
    transform = () => console.log("Optimus prime!")
    sayPhrase = () => console.log(this.phrase)
}
```

然后我们可以像这样从这些类中实例化我们的角色：

```
const alien1 = new Alien("Ali", "I'm Ali the alien!")
// We use the "new" keyword followed by the corresponding class name
// and pass it the corresponding parameters according to what was declared in the class constructor function

const alien2 = new Alien("Lien", "Run for your lives!")
const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!")
const bug2 = new Bug("Erik", "I drink decaf!")
const Robot1 = new Robot("Tito", "I can cook, swim and dance!")
const Robot2 = new Robot("Terminator", "Hasta la vista, baby!")
```

然后我们可以像这样从这些类中实例化我们的角色：

```
const alien1 = new Alien("Ali", "I'm Ali the alien!")
// We use the "new" keyword followed by the corresponding class name
// and pass it the corresponding parameters according to what was declared in the class constructor function

const alien2 = new Alien("Lien", "Run for your lives!")
const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!")
const bug2 = new Bug("Erik", "I drink decaf!")
const Robot1 = new Robot("Tito", "I can cook, swim and dance!")
const Robot2 = new Robot("Terminator", "Hasta la vista, baby!")
```

再一次，我们可以像这样访问每个对象的属性和方法：

```
console.log(alien1.name) // output: "Ali"
console.log(bug2.species) // output: "bug"
Robot1.sayPhrase() // output: "I can cook, swim and dance!"
Robot2.transform() // output: "Optimus prime!"
```

这种方法和一般类的使用的好处在于，我们可以使用这些“蓝图”来更快、更安全地创建新对象，而不是“手动”创建新对象。

此外，我们的代码组织得更好，因为我们可以清楚地识别每个对象属性和方法的定义位置（在类中）。这使得未来的更改或调整更容易实施。

# Some things to keep in mind about classes:

按照[这个定义，](https://www.bookstack.cn/read/You-Dont-Know-JS-Get-Started-2nd/spilt.6.833b11649d196dea.md?wd=JS)用更正式的术语来说，

> *“程序中的类是自定义数据结构“类型”的定义，它包括数据和对该数据进行操作的行为。类定义了这种数据结构的工作方式，但类本身并不是具体的值。要获得您可以在程序中使用的具体值，一个类必须被实例化（使用“new”关键字）一次或多次。”*

- 请记住，类不是实际的实体或对象。类是我们将用来创建实际对象的蓝图或模型。
- 按照惯例，类名使用大写首字母和驼峰式命名。class 关键字创建一个常量，因此以后不能重新定义它。
- 类必须始终有一个构造函数方法，该方法稍后将用于实例化该类。JavaScript 中的构造函数只是一个简单的旧函数，它返回一个对象。它唯一的特别之处在于，当使用“new”关键字调用时，它将其原型分配为返回对象的原型。
- “this”关键字指向类本身，用于在构造方法中定义类属性。
- 可以通过简单地定义函数名称及其执行代码来添加方法。
- JavaScript 是一种基于原型的语言，在 JavaScript 中，类仅用作语法糖。这在这里并没有太大的区别，但是很高兴知道并记住这一点。[如果您想了解有关此主题的更多信息，](https://www.freecodecamp.org/news/prototypes-and-inheritance-in-javascript/)可以阅读这篇文章。

# The Four Principles of OOP

OOP 通常用 4 个关键原则来解释，这些原则决定了 OOP 程序的工作方式。这些是**继承、封装、抽象和多态**。让我们回顾一下它们。

# Inheritance

**继承是基于其他类创建类**的能力。通过继承，我们可以定义一个**父类**（具有某些属性和方法），然后**子类**将从父类继承它具有的所有属性和方法。

让我们看一个例子。想象一下我们之前定义的所有角色都将成为我们主角的敌人。而作为敌人，他们都会拥有“力量”属性和“攻击”手段。

实现它的一种方法是向我们拥有的所有类添加相同的属性和方法，如下所示：

```
class Bug {
    constructor (name, phrase, power) {
        this.name = name
        this.phrase = phrase
        this.power = power
        this.species = "bug"
    }
    hide = () => console.log("You can't catch me now!")
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}

class Robot {
    constructor (name, phrase, power) {
        this.name = name
        this.phrase = phrase
        this.power = power
        this.species = "robot"
    }
    transform = () => console.log("Optimus prime!")
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}

const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!", 10)
const Robot1 = new Robot("Tito", "I can cook, swim and dance!", 15)

console.log(bug1.power) //output: 10
Robot1.attack() // output: "I'm attacking with a power of 15!"
```

但是你可以看到我们在重复代码，这不是最优的。更好的方法是声明一个父“敌人”类，然后由所有敌对物种扩展，如下所示：

```
class Enemy {
    constructor(power) {
        this.power = power
    }

    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power) {
        super(power)
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayPhrase = () => console.log(this.phrase)
}
```

看到敌人类看起来和其他类一样。我们使用构造函数方法来接收参数并将它们分配为属性，并且方法被声明为简单的函数。

在子类上，我们使用`extends`关键字来声明我们想要继承的父类。然后在构造方法上，我们要声明“power”参数，并用`super`函数来表示在父类上声明了属性。

当我们实例化新对象时，我们只需传递在相应构造函数中声明的参数，*瞧！*我们现在可以访问父类中声明的属性和方法了。

```
const alien1 = new Alien("Ali", "I'm Ali the alien!", 10)
const alien2 = new Alien("Lien", "Run for your lives!", 15)

alien1.attack() // output: I'm attacking with a power of 10!
console.log(alien2.power) // output: 15
```

现在假设我们要添加一个新的父类来分组我们所有的角色（无论他们是否是敌人），并且我们要设置“速度”属性和“移动”方法。我们可以这样做

```
class Character {
    constructor (speed) {
        this.speed = speed
    }

    move = () => console.log(`I'm moving at the speed of ${this.speed}!`)
}

class Enemy extends Character {
    constructor(power, speed) {
        super(speed)
        this.power = power
    }

    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(power, speed)
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayPhrase = () => console.log(this.phrase)
}
```

首先我们声明新的“Character”父类。然后我们在 Enemy 类上扩展它。最后，我们将新的“速度”参数添加到 Alien 类的`constructor`和`super`函数中。

我们像往常一样实例化传递参数，瞧，我们可以从“祖父母”类访问属性和方法*。*

```
const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50)
const alien2 = new Alien("Lien", "Run for your lives!", 15, 60)

alien1.move() // output: "I'm moving at the speed of 50!"
console.log(alien2.speed) // output: 60
```

现在我们对继承有了更多的了解，让我们重构我们的代码，以便尽可能避免代码重复：

```
class Character {
    constructor (speed) {
        this.speed = speed
    }
    move = () => console.log(`I'm moving at the speed of ${this.speed}!`)
}

class Enemy extends Character {
    constructor(name, phrase, power, speed) {
        super(speed)
        this.name = name
        this.phrase = phrase
        this.power = power
    }
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}

class Bug extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "bug"
    }
    hide = () => console.log("You can't catch me now!")
}

class Robot extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "robot"
    }
    transform = () => console.log("Optimus prime!")
}


const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50)
const alien2 = new Alien("Lien", "Run for your lives!", 15, 60)
const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!", 25, 100)
const bug2 = new Bug("Erik", "I drink decaf!", 5, 120)
const Robot1 = new Robot("Tito", "I can cook, swim and dance!", 125, 30)
const Robot2 = new Robot("Terminator", "Hasta la vista, baby!", 155, 40)
```

看到我们的物种类现在看起来更小了，这要归功于我们将所有共享属性和方法移动到一个共同的父类。这就是效率继承可以帮助我们的那种。

# Some things to keep in mind about inheritance:

- 一个类只能有一个父类可以继承。你不能扩展多个类，尽管有一些技巧和方法可以解决这个问题。
- 您可以根据需要扩展继承链，设置父、祖父母、曾祖父母类等。
- 如果子类继承了父类的任何属性，则必须先分配调用该`super()`函数的父属性，然后再分配自己的属性。

一个例子：

```
// This works:
class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}

// This throws an error:
class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        this.species = "alien" // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
        super(name, phrase, power, speed)
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}
```

- 继承时，所有父方法和属性都将由子继承。我们无法决定从父类继承什么（就像我们无法选择从父母那里继承的优点和缺点一样。😅 当我们谈论组合时，我们会回到这个问题上）。
- 子类可以覆盖父类的属性和方法。

举个例子，在我们之前的代码中，Alien 类扩展了 Enemy 类，它继承了`attack`logs 的方法`I'm attacking with a power of ${this.power}!`：

```
class Enemy extends Character {
    constructor(name, phrase, power, speed) {
        super(speed)
        this.name = name
        this.phrase = phrase
        this.power = power
    }
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}

const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50)
alien1.attack() // output: I'm attacking with a power of 10!
```

假设我们希望该`attack`方法在 Alien 类中做不同的事情。我们可以通过再次声明它来覆盖它，如下所示：

```
class Enemy extends Character {
    constructor(name, phrase, power, speed) {
        super(speed)
        this.name = name
        this.phrase = phrase
        this.power = power
    }
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    attack = () => console.log("Now I'm doing a different thing, HA!") // Override the parent method.
}

const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50)
alien1.attack() // output: "Now I'm doing a different thing, HA!"
```

# Encapsulation

封装是 OOP 中的另一个关键概念，它代表对象“决定”将哪些信息公开给“外部”以及不公开哪些信息的能力。封装是通过**公共和私有属性和方法**实现的。

在 JavaScript 中，所有对象的属性和方法默认都是公开的。“公共”只是意味着我们可以从对象自身的外部访问对象的属性/方法：

```
// Here's our class
class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}

// Here's our object
const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50)

// Here we're accessing our public properties and methods
console.log(alien1.name) // output: Ali
alien1.sayPhrase() // output: "I'm Ali the alien!"
```

为了更清楚地说明这一点，让我们看看私有属性和方法的样子。

假设我们希望 Alien 类具有一个`birthYear`属性，并使用该属性来执行一个`howOld`方法，但我们不希望该属性可以从对象本身以外的任何其他地方访问。我们可以这样实现：

```
class Alien extends Enemy {
    #birthYear // We first need to declare the private property, always using the '#' symbol as the start of its name.

    constructor (name, phrase, power, speed, birthYear) {
        super(name, phrase, power, speed)
        this.species = "alien"
        this.#birthYear = birthYear // Then we assign its value within the constructor function
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    howOld = () => console.log(`I was born in ${this.#birthYear}`) // and use it in the corresponding method.
}
    
// We instantiate the same way we always do
const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50, 10000)
```

然后我们可以访问该`howOld`方法，如下所示：

```
alien1.howOld() // output: "I was born in 10000"
```

但是如果我们尝试直接访问该属性，我们会得到一个错误。如果我们记录对象，私有属性将不会显示。

```
console.log(alien1.#birthYear) // This throws an error
console.log(alien1) 
// output:
// Alien {
//     move: [Function: move],
//     speed: 50,
//     sayPhrase: [Function: sayPhrase],
//     attack: [Function: attack],
//     name: 'Ali',
//     phrase: "I'm Ali the alien!",
//     power: 10,
//     fly: [Function: fly],
//     howOld: [Function: howOld],
//     species: 'alien'
//   }
```

封装在我们需要某些属性或方法用于对象的内部工作的情况下很有用，但我们不想将其暴露给外部。拥有私有属性/方法可确保我们不会“意外”暴露我们不想要的信息。

# Abstraction

抽象是一个原则，它表示一个类应该只表示与问题上下文相关的信息。用简单的英语，只向外部公开您将要使用的属性和方法。如果不需要，不要暴露它。

这个原则与封装密切相关，因为我们可以使用公共和私有属性/方法来决定什么被暴露，什么不被暴露。

# Polymorphism

然后是多态性（听起来很复杂，不是吗？OOP 名称是最酷的......🙃）。多态意味着“多种形式”，实际上是一个简单的概念。它是一种方法根据特定条件返回不同值的能力。

例如，我们看到 Enemy 类有`sayPhrase`方法。我们所有的物种类都继承自 Enemy 类，这意味着它们也都具有该`sayPhrase`方法。

但是我们可以看到，当我们在不同的物种上调用该方法时，会得到不同的结果：

```
const alien2 = new Alien("Lien", "Run for your lives!", 15, 60)
const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!", 25, 100)

alien2.sayPhrase() // output: "Run for your lives!"
bug1.sayPhrase() // output: "Your debugger doesn't work with me!"
```

那是因为我们在实例化时为每个类传递了不同的参数。这是一种多态性，**基于参数的**。👌

另一种多态性是**基于继承的**，它指的是当我们有一个设置方法的父类并且子类覆盖该方法以以某种方式修改它时。我们之前看到的例子也适用于这里：

```
class Enemy extends Character {
    constructor(name, phrase, power, speed) {
        super(speed)
        this.name = name
        this.phrase = phrase
        this.power = power
    }
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    attack = () => console.log("Now I'm doing a different thing, HA!") // Override the parent method.
}

const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50)
alien1.attack() // output: "Now I'm doing a different thing, HA!"
```

这个实现是多态的，因为如果我们注释掉`attack`Alien 类中的方法，我们仍然可以在对象上调用它：

```
alien1.attack() // output: "I'm attacking with a power of 10!"
```

我们得到了相同的方法，它可以做一件事或另一件事，这取决于它是否被覆盖。多态的。👌👌

# Object Composition

[对象组合](https://en.wikipedia.org/wiki/Composition_over_inheritance)是一种替代继承的技术。

当我们谈到继承时，我们提到子类总是继承所有父方法和属性。好吧，通过使用组合，我们可以以比继承允许的更灵活的方式将属性和方法分配给对象，因此对象只得到它们需要的东西，而没有别的。

我们可以通过使用接收对象作为参数并为其分配所需属性/方法的函数来非常简单地实现这一点。让我们看一个例子。

现在假设我们想为我们的虫子角色添加飞行能力。正如我们在代码中看到的，只有外星人有这个`fly`方法。因此，一种选择可能是在类中复制完全相同的方法`Bug`：

```
class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}

class Bug extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "bug"
    }
    hide = () => console.log("You can't catch me now!")
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!") // We're duplicating code =(
}
```

另一种选择是将`fly`方法向上移动到`Enemy`类，以便它可以被 the`Alien`和`Bug`类继承。但这也使该方法可用于不需要它的类，例如`Robot`.

```
class Enemy extends Character {
    constructor(name, phrase, power, speed) {
        super(speed)
        this.name = name
        this.phrase = phrase
        this.power = power
    }
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
}


class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
}

class Bug extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "bug"
    }
    hide = () => console.log("You can't catch me now!")
}

class Robot extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "robot"
    }
    transform = () => console.log("Optimus prime!")
	// I don't need the fly method =(
}
```

如您所见，当我们对类的起始计划发生变化时（在现实世界中几乎总是如此），继承会导致问题。对象组合提出了一种方法，其中对象仅在需要时才获得属性和方法。

在我们的示例中，我们可以创建一个函数，它唯一的职责是将飞行方法添加到任何接收为参数的对象：

```
const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!", 25, 100)

const addFlyingAbility = obj => {
    obj.fly = () => console.log(`Now ${obj.name} can fly!`)
}

addFlyingAbility(bug1)
bug1.fly() // output: "Now Buggy can fly!"
```

对于我们可能希望我们的怪物拥有的每种能力或能力，我们可以拥有非常相似的功能。

正如你所看到的，这种方法比让父类具有固定的属性和方法来继承要灵活得多。每当一个对象需要一个方法时，我们只要调用相应的函数就可以了。👌

这是[一个很好的视频，将继承与组合进行了比较](https://www.youtube.com/watch?v=wfMtDGfHWpA&t=3s)。

# Roundup

正如我们所见，编程范式是我们面对编程问题和组织代码的不同方式。

命令式、过程式、函数式、声明式和面向对象的范例是当今最流行和广泛使用的范例。了解它们的基础知识对于一般知识以及更好地理解编码世界的其他主题都有好处。
