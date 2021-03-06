require('proof')(6, async okay => {
    const advance = require('..')

    {
        const gathered = [], promises = []
        const iterator = advance([ [ 1, 2 ], [ 3, 4, 5 ] ])
        while (! iterator.done) {
            iterator.next(promises, items => {
                for (const item of items) {
                    gathered.push(item)
                }
            })
            while (promises.length != 0) {
                await promises.shift()
            }
        }
        okay(gathered, [ 1, 2, 3, 4, 5 ], 'forward')
        okay(iterator.type, 0, 'forward type map')
    }

    {
        const gathered = [], promises = []
        const iterator = advance([ [ 1, 2 ], [ 3, 4, 5 ] ], { reverse: true })
        while (! iterator.done) {
            iterator.next(promises, items => {
                for (const item of items) {
                    gathered.push(item)
                }
            })
            while (promises.length != 0) {
                await promises.shift()
            }
        }
        okay(gathered, [ 1, 2, 3, 4, 5 ].reverse(), 'reverse')
        okay(iterator.type, 1, 'reverse type map')
    }

    {
        const gathered = [], promises = []
        const iterator = advance([ [ 1, 2 ], [ 3, 4, 5 ] ], { map: true })
        while (! iterator.done) {
            iterator.next(promises, items => {
                for (const item of items) {
                    gathered.push(item)
                }
            })
            while (promises.length != 0) {
                await promises.shift()
            }
        }
        okay(gathered, [ 1, 2, 3, 4, 5 ], 'map')
        okay(iterator.type, 2, 'map type set')
    }
})
