require('proof')(3, require('cadence')(prove))

function prove (async, assert) {
    var values = [ 'a', 'b', 'c' ]
    var iterator = require('../..')(values)
    async(function () {
        iterator.next(async())
    }, function (more) {
        assert(more, 'more')
        var items = [], item
        while (item = iterator.get()) {
            items.push(item)
        }
        assert(items, [ 'a', 'b', 'c' ], 'next')
        iterator.next(async())
    }, function (more) {
        assert(!more, 'no more')
    }, function () {
        iterator.unlock(async())
    })
}
