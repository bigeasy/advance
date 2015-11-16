require('proof')(9, require('cadence')(prove))

function prove (async, assert) {
    var values = [ 'a', 'b', 'c' ]
    var advance = require('../..')
    var iterator
    function comparator (a, b) { return a < b ? -1 : a > b ? 1 : 0 }
    async(function () {
        iterator = advance.forward(comparator, values)
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
        iterator.unlock(async())
    }, function () {
        iterator = advance.forward(comparator, values, 1)
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
        iterator.unlock(async())
    }, function () {
        iterator = advance.forward(comparator, values, 1)
        iterator.next(async())
    }, function (more) {
        assert(more, 'more')
        var items = [], item
        values.push('d')
        items.push(iterator.get())
        values.push('e')
        items.push(iterator.get())
        values.unshift('!', '?')
        while (item = iterator.get()) {
            items.push(item)
        }
        assert(items, [ 'b', 'c', 'd', 'e' ], 'values unshifted')
        iterator.next(async())
    }, function (more) {
        assert(!more, 'no more unshifted')
        iterator.unlock(async())
    })
}
