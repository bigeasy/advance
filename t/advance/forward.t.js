require('proof')(2, function (step, deepEqual) {
    var values = 'a b c'.split(/\s+/), records = [], keys = []
    var iterator = require('../..')(values, function (record, callback) {
        callback(null, record, record)
    })
    step(function () {
        step(function () {
            iterator.next(step())
        }, function (record, key) {
            if (record && key) {
                records.push(record)
                keys.push(key)
            } else {
                step(null)
            }
        })()
    }, function () {
        deepEqual(records, values, 'records')
        deepEqual(keys, values, 'keys')
        iterator.unlock()
    })
})
