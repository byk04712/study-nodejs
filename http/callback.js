/**
 * 回调函数
 */


function say(name) {
	console.log(name + ' saying a lot');
}

function who(callback, name) {
	name = 'Mr ' + name;
	callback(name);
}

who(say, 'Jack');