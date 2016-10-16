// 作用域

let globalVar = 'Global variable';


function fn() {
	let variable = 'function variable';

	console.log(globalVar);
	console.log(variable);

	globalVar = 'Global variable has changed';

	function innerFn() {
		let innerVar = 'inner variable';
		console.log(innerVar);
		console.log(variable);
		console.log(globalVar);
	}

	innerFn();
}

fn();


console.log('------------分割线-------------');


var pet = {
	words: ' mie mie',

	say: function(name) {
		console.log(name + this.words);
		console.log(this === pet);
		console.log(this);	// this对象为调用此方法的调用对象，此处调用对象是 pet
	}
}

pet.say('李四');


console.log('------------分割线-------------');


function people(hi) {
	this.hi = hi;
	console.log(this.hi);
	console.log(this === people);// false
	console.log(this === global);// true
}

people('andy');


console.log('------------分割线-------------');


var b = {
	words: 'new'
};

// 用b对象替换pet对象, 区别在于，apply 可以传递多个参数，而call只能传递单个参数
pet.say.apply(b, ['王五']);
pet.say.call(b, '赵六');



console.log('------------分割线-- apply call 实现继承 -----------');

function Animal(name) {
	this.name = name;
	this.eat = function() {
		console.log(name + ' eating');
	}
}

function Scott(name) {
	// Animal.apply(this, [name]);
	Animal.call(this, name);
}

var scott = new Scott('东北虎');
scott.eat();
