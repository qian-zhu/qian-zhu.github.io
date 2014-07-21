Title: Object in js 
Date: 2014-07-19
Tags: javascript, Vim 
Category:Javascript
Slug: object in javascript
Summary: object in javacript 

[An Introdunction to Programming Type systems][1] 解释了比较了dynamic/static 以及 strong/weak 类型的编程语言。其中javascript属于strong and dynamic类型。
> **Python, JavaScript and Ruby** dynamically infer the types of objects, instead of forcing you to define them, and then enforce those types when the program runs in the interpreter. 
> All dynamically typed languages need a strong typing system at runtime or else they won’t be able to resolve the object types.

在javacript中，几乎所有的东西的都是object. JS内置了9个object的constructer 

* Number()
* String()
* Boolean()
* Object()
* Array()
* Function()
* Date()
* RegExp()
* Error()

Javascript可以说就是由这9个object构建的. 还有string,number,true,false,null,undefined等是primitive values. 对其的引用和复制是基于value的。而对于object是基于**引用**的——通过object的名字找到object对应的引用。

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

[1]: http://www.smashingmagazine.com/2013/04/18/introduction-to-programming-type-systems/
