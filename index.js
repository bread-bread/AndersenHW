////// Prototype

function inherit(child, parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype.parent = parent;
}

const Animal = function(name) {
	this.setName(name)
}
Animal.prototype.setName = function(name) {
	this.name = name;
}
Animal.prototype.getName = function() {
	return this.name;
}
const Rabbit = function(name, speed) {
	this.setName(name);
	this.setSpeed(speed);
}
inherit(Rabbit, Animal);
Rabbit.prototype.setSpeed = function(speed) {
	this.speed = speed;
}
Rabbit.prototype.getSpeed = function() {
	return this.speed;
}
const RabbitChild = function(name, parentSpeed) {
	this.setName(name);
	this.setSpeed(parentSpeed);
}

inherit(RabbitChild, Rabbit);

RabbitChild.prototype.setSpeed = function(speed) {
	this.parent.prototype.setSpeed.call(this, speed/2);
}

RabbitChild.prototype.getSpeed = function() {
	return "Child speed equal 50% of parent speed: " +this.speed;
}

let child = new RabbitChild("Small_Rodjer", 46);
let rabbit = new Rabbit("Rodjer", 46);

console.log(rabbit.getSpeed());
console.log(child.getSpeed());

///// Classes

class Animal {
	constructor(name) {
		this.setName(name);
	}

	setName(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}
}

class Rabbit extends Animal {
	constructor(name, speed) {
		super();
		this.setName(name);
		this.setSpeed(speed);
	}
	setSpeed(speed) {
		this.speed = speed;
	}
	getSpeed() {
		return this.speed;
	}
}
class RabbitChild extends Rabbit {
	constructor(name, parentSpeed) {
		super();
		this.setName(name);
		this.setSpeed(parentSpeed);
	}
	setSpeed(speed) {
		super.setSpeed(speed/2);
	}
	getSpeed() {
		return "Child speed equal 50% of parent speed: " +this.speed;
	}
}

let rabbit = new Rabbit('Junk', 60);
let child = new RabbitChild('MiniJunk', 60);

console.log(rabbit.getSpeed());
console.log(child.getSpeed());

////// OLOO

const Animal = {
	setName(name) {
		this.name = name;
	},
	getName() {
		return this.name;
	}
}

const Rabbit = Object.create(Animal);

Rabbit.setSpeed = function(speed) {
	this.speed = speed || 60;
}
Rabbit.getSpeed = function() {
	return this.speed;
}

const rabbit = Object.create(Rabbit);

rabbit.setName('Junk');
rabbit.setSpeed(60);

const RabbitChild = Object.create(Rabbit);

RabbitChild.parent = Rabbit; // Если хочу переопределить метод с сохранением названия, как поступать? Пока сделал так.

RabbitChild.setSpeed = function(parentSpeed) {
	this.parent.setSpeed(parentSpeed/2);
}

RabbitChild.getSpeed = function() {
	return "Child speed equal 50% of parent speed: " +this.speed;
}

const child = Object.create(RabbitChild);
child.setName('MiniJunk');
child.setSpeed(60);
child.getSpeed();