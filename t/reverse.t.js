require('proof')(12, require('cadence')(prove))

function prove (async, okay) {
    var values = [ 'a', 'b', 'c' ]
    var advance = require('..')
    var iterator
    function comparator (a, b) { return a < b ? -1 : a > b ? 1 : 0 }
    async(function () {
        iterator = advance.reverse(comparator, values)
        iterator.next(async())
    }, function (more) {
        okay(more, 'more')
        var items = [], item
        while (item = iterator.get()) {
            items.push(item)
        }
        okay(items, [ 'c', 'b', 'a' ], 'next')
        iterator.next(async())
    }, function (more) {
        okay(!more, 'no more')
    }, function () {
        iterator.unlock(async())
    }, function () {
        iterator = advance.reverse(comparator, values, 1)
        iterator.next(async())
    }, function (more) {
        okay(more, 'more')
        var items = [], item
        while (item = iterator.get()) {
            items.push(item)
        }
        okay(items, [ 'b', 'a' ], 'next with index')
        iterator.next(async())
    }, function (more) {
        okay(!more, 'no more with index')
    }, function () {
        iterator.unlock(async())
    }, function () {
        iterator = advance.reverse(comparator, values)
        iterator.next(async())
    }, function (more) {
        okay(more, 'more')
        var items = [], item
        values.push('d')
        items.push(iterator.get())
        values.push('e')
        items.push(iterator.get())
        values.unshift('!', '?')
        while (item = iterator.get()) {
            items.push(item)
        }
        okay(items, [ 'c', 'b', 'a', '?', '!' ], 'values unshifted')
        iterator.next(async())
    }, function (more) {
        okay(!more, 'no more unshifted')
        iterator.unlock(async())
    }, function () {
        values = [ 'a', 'b', 'c', 'd' ]
        iterator = advance.reverse(comparator, values, values.length - 2)
        iterator.next(async())
    }, function (more) {
        okay(more, 'more unshifted with index')
        var items = [], item
        values.push('d')
        items.push(iterator.get())
        values.push('e')
        items.push(iterator.get())
        values.unshift('!', '?')
        while (item = iterator.get()) {
            items.push(item)
        }
        okay(items, [ 'c', 'b', 'a', '?', '!' ], 'values unshifted')
        iterator.next(async())
    }, function (more) {
        okay(!more, 'no more unshifted with index')
    })
}
