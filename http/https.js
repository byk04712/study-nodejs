/**
 * 创建一个 https 服务
 */

const https = require('https');
// 引入文件流
const fs = require('fs');


/*
1.输入如下命令生成证书
openssl genrsa 1024 > ssh_key.pem

设置密码加密
openssl genrsa -des3 1024 > ssh_key.pem


2.输入如下命令生成安全证书
openssl req -x509 -days 365 -new -key ssh_key.pem > ssh_cert.pem

按照提示输入证书相应的信息

如果证书设置有秘密，在nodejs中加载时，需要输入密码

var privateKey  = fs.readFileSync('./Data/key.pem', 'utf8');
var certificate = fs.readFileSync('./Data/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate,passphrase:"111111"};
 */
const options = {
	key: fs.readFileSync('ssh_key.pem'),
	cert: fs.readFileSync('ssh_cert.pem')
};

https.createServer(options, (req, res) => {
	res.writeHead(200);

	res.end('Hello https');

}).listen(8000);

console.log('https started. please visit https://localhost:8000');