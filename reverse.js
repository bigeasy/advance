module.exports = function (arrays) {
    let index = arrays.length - 1
    return {
        [Symbol.asyncIterator]: function () {
            return this
        },
        next () {
            if (index == -1) {
                return { done: true }
            }
            const array = arrays[index--]
            return {
                done: false,
                value: array.slice().reverse()
            }
        }
    }
}
