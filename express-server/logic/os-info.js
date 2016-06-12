const os = require('os');
module.exports = () => {
    return {
        platform: os.platform(),
        type: os.type(),
        version: os.release(),
        uptime: os.uptime(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem()
    }
}