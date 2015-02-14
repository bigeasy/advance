function Advance (array) {
    this._array = array
}

Advance.prototype.next = function (callback) {
    var array = this._array
    this._array = null
    callback(null, array)
}

Advance.prototype.unlock = function (callback) {
    callback()
}

module.exports = function (array, fixup) {
    return new Advance(array, fixup)
}
