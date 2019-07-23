const fs = require('fs');
const path = require('path');
const mockRoot = path.resolve(__dirname, '../mocks/') + '/';
const files = ['.js', '.json', '/index.js', '/index.json', ''];

function mockJsFile(uri, req, res) {
    console.log('本地模拟数据:', uri.replace(mockRoot, ''));

    let mock = require(uri);

    if (typeof mock === 'function') {
        mock = mock.call(this, req, res);
    }

    res.send(mock);

    delete require.cache[require.resolve(uri)];
}

module.exports = function (req, res, next) {
    const base = mockRoot + req.url.split('?')[0];

    let i;

    for (i = 0; i < files.length; i++) {
        let uri = base + files[i];
        if (fs.existsSync(uri) && fs.statSync(uri).isFile()) {
            if (/\.js$/.test(uri)) {
                mockJsFile(uri, req, res);
            } else {
                console.log('本地模拟数据:', uri.replace(mockRoot, ''));
                res.send(require(uri));
                delete require.cache[require.resolve(uri)];
            }
            break;
        }
    }

    if (i === files.length) {
        next();
    }
};
