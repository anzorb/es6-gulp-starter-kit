module.exports = {
    basePath: '',
    frameworks: ['jasmine', 'browserify', 'es6-shim'],
    files: [
        '../src/Foo.js',
        '../src/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
        '../src/**/*.js': 'browserify',
    },
    browsers: ['Chrome', 'Chrome_without_security'],
    customLaunchers: {
        Chrome_without_security: {
            base: 'Chrome',
            flags: ['--disable-web-security']
        }
    },
    port: 9876,
    colors: true,
    browsers: ['Chrome']
};
