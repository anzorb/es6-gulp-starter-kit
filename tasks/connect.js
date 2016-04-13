var serveStatic = require('serve-static');

module.exports = {
    server: {
        options: {
            port: 9001,
            base: 'demo',
            livereload: 35729,
            open: true,
            //keepalive: true,
            middleware: function connectMiddleware(connect, options, middlewares) {
                middlewares.push(connect().use('/dist', serveStatic('./dist')));
                return middlewares;
            }
        }
    }
};
