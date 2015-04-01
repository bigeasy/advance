var util = require('util')

function scan (sought, offset) {
    if (sought != null) {
        var comparator = this._comparator
        for (;;) {
            if (this._comparator(this._array[this._index + offset], sought) === 0) {
                break
            }
            this._index++
        }
    } else {
        scan.call(this, this._start, 0)
    }
    this._length = this._array.length
}

function Forward (comparator, array, index) {
    this._comparator = comparator
    this._array = array
    this._length = array.length
    this._index = index == null ? 0 : index
    this._start = array[this._index]
}

Forward.prototype.get = function () {
    var array = this._array
    if (this._length !== array.length) {
        scan.call(this, this._previous, -1)
    }
    return this._previous = array[this._index++]
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

exports.forward = function (comparator, array, index) {
    return new Forward(comparator, array, index)
}

function Reverse (comparator, array, index) {
    this._comparator = comparator
    this._array = array
    this._length = array.length
    this._startIndex = index
    this._index = index == null ? array.length - 1 : index
    this._start = array[this._index]
}

Reverse.prototype.get = function () {
    var array = this._array
    if (this._length !== array.length) {
        scan.call(this, this._previous, 1)
    }
    return this._previous = array[this._index--]
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

exports.reverse = function (comparator, array, index) {
    return new Reverse(comparator, array, index)
}
