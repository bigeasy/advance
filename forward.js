module.exports = function (arrays) {
    let index = 0
    const iterator = {
        done: false,
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
