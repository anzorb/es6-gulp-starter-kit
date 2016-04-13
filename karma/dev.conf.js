var _ = require('lodash');

module.exports = function(config) {
    var configObject = {
        browserify: {
            debug: true,
            transform: [
                ['babelify', {
                    presets: ['es2015'],
                    plugins: ['rewire']
                }]
            ]
        },
        reporters: ['progress'],
        singleRun: false,
        logLevel: config.LOG_INFO
    };
    config.set(_.extend(configObject, require('./common.js')));
};
