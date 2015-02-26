function Forward (array) {
    this._array = array
    this._index = 0
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

exports.forward = function (array) {
    return new Forward(array)
}

function Reverse (array) {
    this._array = array
    this._index = array.length - 1
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

exports.reverse = function (array) {
    return new Reverse(array)
}
