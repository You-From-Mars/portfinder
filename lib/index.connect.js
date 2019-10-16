const net = require('net');

exports.basePort = 8000
exports.highestPort = 65535

let port = exports.basePort
const internals = {}

internals.nextPort = () => {
    port++
    return port
}


exports.getPort = (callback) => {
    const c = net.connect({ port }, '127.0.0.1')
    c.once('error', (e) => {
        callback(null, port)
    })
    c.once('connect', () => {
        c.destroy();
        if (port < exports.highestPort) {
            port = internals.nextPort()
            exports.getPort(callback)
        } else {
            callback(new Error('No open ports available'));
        }
    })
}
