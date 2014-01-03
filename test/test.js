var path = require('path');
require('../').addPath(path.join(__dirname, 'src'));

require('module-a').sayHello();
require('module-b').sayHello();

console.log('All tests passed!');