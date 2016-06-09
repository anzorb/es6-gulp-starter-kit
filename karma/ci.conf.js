var istanbul = require('browserify-istanbul');
var isparta = require('isparta');
var _ = require('lodash');

module.exports = function(config) {
    var configObject = {
        browserify: {
            debug: true,
            transform: [
                istanbul({
                    instrumenter: isparta,
                    instrumenterConfig: {
                        babel: {
                            presets: ['es2015'],
                            plugins: ['rewire']
                        }
                    },
                    ignore: ['../**/node_modules/**', '../**/*.spec.js', '../tests/index.js']
                }),
                ['babelify', {
                    presets: ['es2015']
                }]
            ]
        },
        reporters: ['progress', 'coverage', 'junit'],
        coverageReporter: {
            dir: '../coverage',
            includeAllSources: true,
            reporters: [{
                type: 'cobertura'
            }, {
                type: 'html'
            }]
        },
        singleRun: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],

        junitReporter: {
            outputDir: 'results',
            outputFile: 'test_results.xml',
            suite: 'design-center-js'
        }
    };
    config.set(_.extend(require('./common.js'), configObject));
};
