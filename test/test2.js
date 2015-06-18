require('./test-helper-code.js');

describe("support for test code", function () {

  it("should load up a module in a path defined in test helper code", function () {
    require('module-a').sayHello();
    require('module-b').sayHello();
  });
});

console.log('All tests passed!');
