module.exports = function () {
    this.clientError = function (req, res, next) {
        var err = new Error('Not found');
        err.status = 404;
        next(err);
    }

    this.serverError = function (error, req, res, next) {
        var status = error.status || 500;
        res.status(status);
        console.error(error.stack);
        res.send('Oh no: ' + status);
    }

    return this;
}