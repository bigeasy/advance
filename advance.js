function Advance (array) {
    this._array = array
    this._index = 0
}

Advance.prototype.get = function () {
    return this._array[this._index++]
}

Advance.prototype.next = function (callback) {
    if (this._index >= this._array.length) {
        callback(null, false)
    } else {
        callback(null, true)
    }
}

Advance.prototype.unlock = function (callback) {
    callback()
}

module.exports = function (array) {
    return new Advance(array)
}
