'use strict';

var Promise = function(func) {
    this._resolves = [];
    var promise = this;

    var handler = function(i, previous) {
        if (i === promise._resolves.length) {
            return;
        }
        var result = promise._resolves[i](previous);
        //检查运行的返回值是否是Promise
        if (result instanceof Promise) {
            //如果是，需要在这个Promise执行成功后，再调用下一个handler
            result.then(function(data) {
                handler(i + 1, data);
            });
            return;
        }
        handler(i + 1, result);
    };

    var resolver = function(data) {
        process.nextTick(function() {
            handler(0, data);
        });
    };

    var rejector = function() {};

    func(resolver, rejector);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
    this._resolves.push(onFulfilled);
    return this;
};

module.exports = Promise;