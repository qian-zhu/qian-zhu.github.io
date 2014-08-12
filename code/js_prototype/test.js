function Person(name,gender){
	this.name = name;
	this.gender = gender;
	this.who = function(){
		return "HI" + this.name;
	};
}
Person.prototype.salary = 10000;
Person.prototype.age = 24;

var a = new Person("Qian",'male');
console.log(a.salary);
