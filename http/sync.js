// 同步

let step = 0;

function start() {
	step++;
	console.log(step + '. start');
}

function running() {
	step++;
	console.log(step + '. running');
}



start();
running();