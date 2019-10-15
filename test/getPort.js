const portfinder = require('../lib/index.js')

portfinder.getPort((err, port) => {
    if (err) {
        console.error(err)
    } else {
        console.log('port:', port)    
    }
})