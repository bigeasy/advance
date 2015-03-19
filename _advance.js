function Forward (array, index) {
    this._array = array
    this._index = index == null ? 0 : index
}

Forward.prototype.get = function () {
    return this._array[this._index++]
}

Forward.prototype.next = function (callback) {
    if (this._index >= this._array.length) {
        callback(null, false)
    } else {
        callback(null, true)
    }
}

Forward.prototype.unlock = function (callback) {
    callback()
}

exports.forward = function (array, index) {
    return new Forward(array, index)
}

function Reverse (array, index) {
    this._array = array
    this._index = index == null ? array.length - 1 : index
}

Reverse.prototype.get = function () {
    return this._array[this._index--]
}

Reverse.prototype.next = function (callback) {
    if (this._index < 0) {
        callback(null, false)
    } else {
        callback(null, true)
    }
}

Reverse.prototype.unlock = function (callback) {
    callback()
}

exports.reverse = function (array, index) {
    return new Reverse(array, index)
}
