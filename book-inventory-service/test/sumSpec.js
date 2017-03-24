var assert = require('assert');
var sum = require('../src/sum');

describe('Math in JS', function () {
    it('should support addition', function () {
        assert.equal(sum(1, 1), 2);
    });
});