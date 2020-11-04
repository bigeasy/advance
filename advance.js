const mvcc = require('mvcc')

module.exports = function (arrays, { reverse = false, set = false } = {}) {
    if (reverse) {
        let index = arrays.length - 1
        const iterator = {
            done: false,
            type: mvcc.REVERSE,
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
            type: set ? mvcc.SET : mvcc.FORWARD,
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
