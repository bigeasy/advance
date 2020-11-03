module.exports = function (arrays, { reverse = false } = {}) {
    if (reverse) {
        let index = arrays.length - 1
        const iterator = {
            done: false,
            type: 1,
            next (promises, consume, terminator = iterator) {
                if (index == -1) {
                    terminator.done = true
                } else {
                    consume(arrays[index--].slice().reverse())
                }
            }
        }
        return iterator
    } else {
        let index = 0
        const iterator = {
            done: false,
            type: 0,
            next (promises, consume, terminator = iterator) {
                if (index == arrays.length) {
                    terminator.done = true
                } else {
                    consume(arrays[index++])
                }
            }
        }
        return iterator
    }
}
