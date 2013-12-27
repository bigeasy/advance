require('proof')(1, function (step, deepEqual) {
    var values = [ 0, 1, 2 ], gather = []
    var iterator = require('../..').forward(values, function (record) {
        return record + 1
    })
    step(function () {
        step(function () {
            iterator.next(step())
        }, function (record) {
            if (!record) step(null)
            else gather.push(record)
        })()
    }, function () {
        deepEqual(gather, [ 1, 2, 3 ], 'iterator')
        iterator.unlock()
    })
})
