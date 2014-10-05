require('proof')(2, require('cadence')(function (step, assert) {
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
                return [ step ]
            }
        })()
    }, function () {
        assert(records, values, 'records')
        assert(keys, values, 'keys')
        iterator.unlock(step())
    })
}))
