module.exports = function (arrays) {
    let index = arrays.length - 1
    const iterator = {
        done: false,
        next (promises, consume, terminator = iterator) {
            if (index == -1) {
                terminator.done = true
            } else {
                consume(arrays[index--].slice().reverse())
            }
        }
    }
    return iterator
}
