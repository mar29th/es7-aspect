const assert = require('assert');
const TestClass = require('./test-class');


var testClass = new TestClass();
describe('testBefore', function () {
  it('should increment the first number in the list provided as argument', function () {
    var lst = [0];
    testClass.testBefore(lst);
    assert.equal(lst[0], 1);
  });
});

describe('testAfter', function () {
  it('should increment the first number in the list provided as argument', function () {
    var lst = [0];
    testClass.testAfter(lst);
    assert.equal(lst[0], 1);
  });
});

describe('testIntercept', function () {
  var lst = [0];

  it('should increment the first number in the list provided as argument on first run (resolve)', function () {
    testClass.testIntercept(lst);
    assert.equal(lst[0], 1);
  });

  it('should set the number to zero on second run (reject)', function () {
    testClass.testIntercept(lst);
    assert.equal(lst[0], 0);
  });
});

describe('testMixed', function () {
  var lst = [];

  it('should produce \'foobar\' by concatenating first two elements', function () {
    testClass.testMixed(lst);
    assert.equal(lst[0] + lst[1], 'foobar');
  });
});
