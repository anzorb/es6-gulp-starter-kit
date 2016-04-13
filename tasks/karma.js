var path = require('path');

module.exports = {
    tdd: function(done) {
        var Server = require('karma').Server;
        new Server({
            configFile: path.resolve('karma/dev.conf.js')
        }, done).start();
    },
    ci: function(done) {
        var Server = require('karma').Server;
        new Server({
            configFile: path.resolve('karma/ci.conf.js')
        }, done).start();
    }
}
