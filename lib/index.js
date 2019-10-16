const net = require('net')

exports.basePort = 8000
exports.highestPort = 65535

let port = exports.basePort
const internals = {}
internals.testPort = (callback) => {
    const server = net.createServer()

    function onError(err) {
        server.removeListener('listening', onListen)
        port = internals.nextPort()
        internals.testPort(callback)
    }

    function onListen() {
        server.removeListener('error', onError)
        server.close()
        callback(port)
    }

    server.once('error', onError)
    server.once('listening', onListen)

    server.listen(port)
}
internals.nextPort = () => {
    port++
    return port
}

exports.getPort = function(callback) {
    let openPorts = exports.basePort
    internals.testPort((port) => {
        openPorts = port
        callback(null, openPorts)
    })
}
