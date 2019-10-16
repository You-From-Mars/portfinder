const net = require('net');

exports.basePort = 8000
let port = exports.basePort
const internals = {}

internals.nextPort = () => {
    port++
    return port
}

internals._getPort = () => {
    
}

exports.getPort = (callback) => {
    const c = net.connect({ port }, '127.0.0.1')
    c.once('error', (e) => {
        callback(null, port)
    })
    c.once('connect', () => {
        c.destroy();
        port = internals.nextPort()
        exports.getPort(callback)
    })
}
