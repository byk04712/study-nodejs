// 异步

let step = 0;

function start() {
	setTimeout(() => {
		step++;
		console.log(step + '. start');
	}, 1000);
}

function running() {
	step++;
	console.log(step + '. running');
}



start();
running();


// 使用回调实现异步

function process(cb) {
	setTimeout(() => {
		console.log('step1 process');
		cb();
	}, 1500);
}

function pause() {
	console.log('step2 pause');
}

process(pause);