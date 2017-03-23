var assert = require('assert');
var sum = require('../sum');

describe('Math in JS', function () {
    it('should support addition', function () {
        assert.equal(sum(1, 1), 2);
    });
});