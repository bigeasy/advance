require('proof')(1, function (step, deepEqual) {
    var values = 'a b c'.split(/\s+/), value, copy = []
    var iterator = require('../..').forward(values)
    step(function () {
        step(function () {
            iterator.next(step())
        }, function (record) {
            if (!record) step(null)
            else copy.push(record)
        })()
    }, function () {
        deepEqual(copy, values, 'iterator')
    })
})
