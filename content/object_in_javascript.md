Title: Object in js 
Date: 2014-07-19
Tags: javascript, Vim 
Slug: object in javascript
Summary: object in javacript 

# General

[An Introdunction to Programming Type systems][1] 解释了比较了dynamic/static 以及 strong/weak 类型的编程语言。其中javascript属于strong and dynamic类型。
> **Python, JavaScript and Ruby** dynamically infer the types of objects, instead of forcing you to define them, and then enforce those types when the program runs in the interpreter. 
> All dynamically typed languages need a strong typing system at runtime or else they won’t be able to resolve the object types.

在javacript中，几乎所有的东西的都是object. JS内置了9个object的constructer 

* Object()
* Function()
* Number()
* String()
* Boolean()
* Array()
* Date()
* RegExp()
* Error()

javascript 是一种 [prototype based programming][2] 的语言,和python之类class based programming还是不同的。class based programming中，class是一个抽象的概念。而prototype based中，没有抽象的class，Object/Function都是一个object.具体可以参考:[Classes vs. Prototypes Some Philosophical and Historical Observations][3]

Javascript可以说就是由这9个object构建的. 还有string,number,true,false,null,undefined等是primitive values. 对其的引用和复制是基于value的。而对于object是基于**引用**的——通过object的名字找到object对应的引用。这9个Object是有层级关系的，Object是他们的父对象。不同的对象有不同的属性。构成了整个JS的基石。

Javascript是一个dynamic的语言，也体现在complex object是有动态的属性的。可以在运行时改变/添加/删除object的属性。这里注意是改变object的属性，而不是他的constructor.

比如:
```javascript
var Person = function(living,age,gender){
	this.living = living;
	this.age = age;
	this.gender = gender;
	this.getGender = function(){
		return this.gender;
	};
};
var cody = new Person(true,33,'male');
Person.greeding = function(){
	console.log('hello');
};
var lisa = new Person(true,33,'female');
lisa.greeding();
```
这里lisa.greeding()会提示找不到这个method的错误。但是如果我们这样修改:
```javacript
var hi = new Person(true,44,'male');
hi.greeding = function(){
	console.log('hello');
};
hi.greeding();
```
这里hi.greeding()会打印hello. 

# References to objects properties are resolved
Javascript有一个奇怪的特性。可以通过方括号的形式来引用Object的成员。我想原因可能有几点:

1. Array也是一个Object，这样通过方括号的形式在Array()就自然了。
2. 可以将变量，作为Object中成员的索引。
```javacript
var string1 = 'foo';
var string2 = 'bar';
console.log(foobarObject[string1 + string2]);
```

访问Object中的一个成员，先访问自有的成员(hasOwnProperty),然后顺着prototype的chain，不断向父Object的prototype找。通过这种方法，实现**继承**

```javascript
function Person(name,gender)
{
	this.name = name;
	this.gender = gender;
}

function Worker(number)
{
	this.number = number;
}
Worker.prototype = new Person;
```
这里Worker继承了Person

# Oriented Object Porgramming in Javascript
javascript的面向对象编程。如果html中的每一块(比如<div></div>)看做是一个object。在这个object里面添加一下function代表与用户的交互。但是这样很容易出现多个object相互之间调用的情况。很麻烦。那么如何使得js的object之间尽可能解耦呢？

[1]: http://www.smashingmagazine.com/2013/04/18/introduction-to-programming-type-systems/
[2]: http://en.wikipedia.org/wiki/Prototype-based_programming
[3]: http://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=2451F21EBF8EF1C8C094C28E1AE735A2?doi=10.1.1.56.4713&rep=rep1&type=pdf
