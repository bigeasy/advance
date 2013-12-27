function Procede (array) {
    this._array = array
    this._index = 0
}

Procede.prototype.next = function (callback) {
    if (this._index < this._array.length) {
        callback(null, this._array[this._index++])
    } else {
        callback()
    }
}

Procede.prototype.unlock = function () {
}

exports.forward = function (array) {
    return new Procede(array)
}
