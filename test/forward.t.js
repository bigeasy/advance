require('proof')(1, async okay => {
    const advance = require('..')

    {
        const gathered = [], promises = []
        const iterator = advance.forward([ [ 1, 2 ], [ 3, 4, 5 ] ])
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
    }
})
