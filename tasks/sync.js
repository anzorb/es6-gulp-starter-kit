module.exports = function() {
    var gulp = require('gulp'),
        config = require('./config.js'),
        sync = require('browser-sync');
    sync.init({
        server: {
            baseDir: config.demo,
            routes: {
                '/dist': config.dist
            }
        }
    });

};
