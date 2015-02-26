require('proof')(6, require('cadence/redux')(prove))

function prove (async, assert) {
    var values = [ 'a', 'b', 'c' ]
    var advance = require('../..')
    var iterator
    async(function () {
        iterator = advance.forward(values)
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
    }, function () {
        iterator = advance.forward(values, 1)
        iterator.next(async())
    }, function (more) {
        assert(more, 'more')
        var items = [], item
        while (item = iterator.get()) {
            items.push(item)
        }
        assert(items, [ 'b', 'c' ], 'next with index')
        iterator.next(async())
    }, function (more) {
        assert(!more, 'no more with index')
    }, function () {
        iterator.unlock(async())
    })
}
