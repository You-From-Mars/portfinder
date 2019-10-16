const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

const serverPortfinder = require('../lib/index.server.js')
const connectPortfinder = require('../lib/index.connect.js')

function serverFinter() {
    serverPortfinder.getPort((err, port) => {
        if (err) {
            console.error('listen error:', err)
        } else {
            console.log('listen port:', port)    
        }
    })
}

function connectFinder() {
    connectPortfinder.getPort((err, port) => {
        if (err) {
            console.error('connect error:', err)
        } else {
            console.log('connect port', port)
        }
    })
}

// serverFinter()
// connectFinder()


suite
.add('listen', serverFinter)
.add('connect', connectFinder)
.on('cycle', function (event) {
    console.log(String(event.target));
})
.on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true })