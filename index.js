function Advance (array, fixup) {
    this._array = array
    this._fixup = fixup
    this._index = 0
}

Advance.prototype.next = function (callback) {
    if (this._index < this._array.length) {
        this._fixup(this._array[this._index++], callback)
    } else {
        callback()
    }
}

Advance.prototype.unlock = function () {
}

exports.forward = function (array, fixup) {
    return new Advance(array, fixup)
}
