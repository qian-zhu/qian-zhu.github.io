function Vehicle(hasEngine,hasWheels)
{
	this.hasEngine = hasEngine || false;
	this.hasWheels = hasWheels || false;
}

function Car(make,model,hp)
{
	this.hp = hp;
	this.make = make;
	this.model = model;
}

Car.prototype = new Vehicle(true,true); //Car.prototype 指向Vehicle
Car.prototype.displaySpecs = function(){
	console.log(this.make + "," + this.model + "," + this.hp + "," + this.hasEngine + "," + this.hasWheels);
};
Car.prototype.constructor = Car;//instance.constructor指向constructor.prototype.constructor;这里Car function object是audi object的constructor,所以要修改其prototype的constructor

console.log(Car.hasEngine);

var audi = new Car('Audi',"A4",150);
audi.displaySpecs();

console.log(audi.constructor);

Vehicle.prototype.hasTrunk = true;
Car.prototype.hasMirror = true;

console.log(audi.hasTrunk);
console.log(audi.hasMirror);
console.log(audi.prototype);
