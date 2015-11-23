In-memory forward iterator for use with the Strata b-tree MVCC tool collection.

```javascript
function comparator (a, b) { return +a - +b }

var test = cadence(function () {
    var iterator
    async(function () {
        iterator = advance.forward(comparator, [ 1, 2, 3 ])
        iterator.next(async())
    }, function (more) {
        assert.ok(more)
        var items = [], item
        while (item = iterator.get()) {
            items.push(item)
        }
        assert.deepEqual(items, [ 1, 2, 3 ], 'next')
        iterator.next(async())
    }, function (more) {
        assert.ok(!more)
        iterator.unlock(async())
    })
})

test(function (error) { if (error) throw error })
```
