function Procede (array, fixup) {
    this._array = array
    this._fixup = fixup
    this._index = 0
}

Procede.prototype.next = function (callback) {
    if (this._index < this._array.length) {
        this._fixup(this._array[this._index++], callback)
    } else {
        callback()
    }
}

Procede.prototype.unlock = function () {
}

exports.forward = function (array, fixup) {
    return new Procede(array, fixup)
}
