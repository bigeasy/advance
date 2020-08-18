class Reverse {
    constructor (arrays) {
        this._arrays = arrays
        this._index = arrays.length - 1
    }

    [Symbol.asyncIterator] () {
        return this
    }

    next () {
        if (this._index == -1) {
            return { done: true }
        }
        const array = this._arrays[this._index--]
        return {
            done: false,
            value: array.slice().reverse()
        }
    }
}

exports.Reverse = Reverse
