if (process.env.NODE_ENV === 'development') {
    module.exports = require('./webpack.dev.conf')
} else if (process.env.NODE_ENV === 'production') {
    module.exports = require('./webpack.prod.conf')
}
