var advance = require('../advance')
var _advance = require('../_advance')
var crypto = require('crypto')
var Benchmark = require('benchmark')

function extractor (record) { return record }
function comparator (a, b) { return a < b ? -1 : a > b ? 1 : 0 }

var array = new Array(1024 * 1024)
for (var i = 0, I = array.length; i < I; i++) {
    array[i] = i
}

var suite = new Benchmark.Suite('call', { /*minSamples: 100*/ })

function fn () {
    var forward = advance.forward(extractor, comparator, array)
    forward.next(function () {
        while (forward.get()) {}
    })
}

function _fn () {
    var forward = _advance.forward(array)
    forward.next(function () {
        while (forward.get()) {}
    })
}

console.log('here')

for (var i = 1; i <= 3; i++)  {
    suite.add({
        name: '_pair compare ' + i,
        fn: _fn
    })

    suite.add({
        name: ' pair compare ' + i,
        fn: fn
    })
}

suite.on('cycle', function(event) {
    console.log(String(event.target));
})

suite.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})

suite.run()
