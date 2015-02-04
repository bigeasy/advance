require('proof')(2, require('cadence')(prove))

function prove (async, assert) {
    var values = 'a b c'.split(/\s+/), records = [], keys = []
    var iterator = require('../..')(values, function (record, callback) {
        callback(null, record, record)
    })
    async(function () {
        async(function () {
            iterator.next(async())
        }, function (record, key) {
            if (record && key) {
                records.push(record)
                keys.push(key)
            } else {
                return [ async ]
            }
        })()
    }, function () {
        assert(records, values, 'records')
        assert(keys, values, 'keys')
        iterator.unlock(async())
    })
}
