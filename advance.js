var util = require('util')

function scan () {
    if (this._previous != null) {
        var extractor = this._extractor,
            comparator = this._comparator,
            marker = extractor(this._previous)
        for (;;) {
            var current = extractor(this._array[this._index])
            if (this._comparator(current, marker) > 0) {
                break
            }
            this._index++
        }
        this._length = this._array.length
    }
}

function Forward (extractor, comparator, array, index) {
    this._extractor = extractor
    this._comparator = comparator
    this._array = array
    this._length = array.length
    this._index = index == null ? 0 : index
}

Forward.prototype.get = function () {
    var array = this._array
    if (this._length !== array.length) {
        scan.call(this)
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

exports.forward = function (extractor, comparator, array, index) {
    return new Forward(extractor, comparator, array, index)
}

function Reverse (extractor, comparator, array, index) {
    this._extractor = extractor
    this._comparator = comparator
    this._array = array
    this._length = array.length
    this._index = index == null ? array.length - 1 : index
}

Reverse.prototype.get = function () {
    var array = this._array
    if (this._length !== array.length) {
        scan.call(this)
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

exports.reverse = function (extractor, comparator, array, index) {
    return new Reverse(extractor, comparator, array, index)
}
