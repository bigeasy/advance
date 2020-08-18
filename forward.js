module.exports = function (arrays) {
    let index = 0

    return {
        [Symbol.asyncIterator]: function () {
            return this
        },
        next: function () {
            if (index == arrays.length) {
                return { done: true }
            }
            return {
                done: false,
                value: arrays[index++]
            }
        }
    }
}
