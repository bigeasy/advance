require('proof')(2, require('cadence')(prove))

function prove (async, assert) {
    var values = [ 'a', 'b', 'c' ]
    var iterator = require('../..')(values)
    async(function () {
        iterator.next(async())
    }, function (items) {
        assert(items, [ 'a', 'b', 'c' ], 'next')
        iterator.next(async())
    }, function (items) {
        assert(items, null, 'next null')
    }, function () {
        iterator.unlock(async())
    })
}
