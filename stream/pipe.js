/**
 * 对 stream_copy_logo_clearly.js 进行增强和简化
 */

const fs = require('fs');

fs.createReadStream('app-debug.apk').pipe(fs.createWriteStream('app-pipe.apk'));