// END 2 END

const request = require('supertest');
const app = require('../index');

describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        request(app)
            .post('/stock')
            .send({
                isbn: "123123132",
                count: 5
            })
            .expect({
                isbn: "123123132",
                count: 5
            }, done);
    });
});