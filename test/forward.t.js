require('proof')(1, async okay => {
    const advance = { forward: require('../forward') }

    {
        const gathered = []
        for await (const items of new advance.forward([ [ 1, 2 ], [ 3, 4, 5 ] ])) {
            for (const item of items) {
                gathered.push(item)
            }
        }
        okay(gathered, [ 1, 2, 3, 4, 5 ], 'forward')
    }
})
