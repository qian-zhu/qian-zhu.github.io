Title: Inheritance in js 
Date: 2014-07-26
Tags: javascript
Slug: Inheritance in javascript
Summary: Inheritance in javacript 

JavaScript is a **class-free**, **object-oriented** language, and as such, it uses **prototypal inheritance** instead of classical inheritance. [1]

有几点关键的:

Javascript没有class的概念，在class based的语言中\(Python,java,C++\)，开始先定义一个class，然后再跟进这个class实例化一个object。在JS中，object是从另一个object创建（不是实例化）的。

比如:

```javacript
function Vehicle(hasEngine,hasWheels)
{
	this.hasEngine = hasEngine || false;
	this.hasWheels = hasWheels || false;
}
var v = Vehicle(true,true);
```
这里Vehicle是一个function object. v是一个通过这个function object创建的object.

Prototype构成了一个chain. 用于实现继承。比如
```javacript
function Car(make,model,hp)
{
	this.hp = hp;
	this.make = make;
	this.model = model;
}
Car.prototype = new Vehicle(true,true); //Car.prototype 指向Vehicle
Car.prototype.constructor = Car;//使得instance object的constructor指向Car
var car = new Car('audi','a6',120);
console.log(car.hasWheels) //这里输出true
```
可以看到这里prototype based实现继承的一个好处，能够给被继承的object传参数。当然在class based的方式中也可以通过构造函数，改变父类中的值。但是没这么清楚，隔离。

一个object的prototype是所有被这个object创建的instance object的公共部分。

[1]: http://www.crockford.com/javascript/inheritance.html
