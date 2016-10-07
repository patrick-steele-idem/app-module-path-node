var path = require('path');
var assert = require('assert');

require('./test-helper-code.js');

describe("support for test code", function () {
  it("should load up a module in a path defined in test helper code", function () {
    require('module-a').sayHello();
    require('module-b').sayHello();
  });
  it("should not search paths that have been removed", function () {
    require('module-c').sayHello();
    require('../').removePath(path.join(__dirname, 'src'));
    assert.throws(function () {
      require('module-d').sayHello();
    });
  });
});

console.log('All tests passed!');
