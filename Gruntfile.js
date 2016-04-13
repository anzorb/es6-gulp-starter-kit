module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dist: 'dist',

        src: 'src',

        docs: 'docs',

        appName: 'Foo',

        //bundle up the modules and run through babel
        browserify: require('./tasks/browserify.js'),

        //extract source-map into a separate file
        exorcise: require('./tasks/exorcise.js'),

        //uglify code, while preserving source-maps
        uglify: require('./tasks/uglify.js'),

        //run tests
        karma: require('./tasks/karma.js'),

        //lint
        eslint: require('./tasks/eslint.js'),

        //generate documentation
        esdoc: require('./tasks/esdoc.js'),

        //serve demo app
        connect: require('./tasks/connect.js'),

        //watch for changes and reload
        watch: require('./tasks/watch.js')

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exorcise');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-esdoc');

    grunt.registerTask('dev', ['eslint', 'browserify', 'connect', 'watch']);
    grunt.registerTask('dist', ['eslint', 'browserify', 'exorcise', 'uglify', 'esdoc']);

};
