var config = require('./config.js');
var appName = config.appName;
var entryPoint = config.entryPoint;
var src = config.src;
var dist = config.dist;
var path = require('path');
var gulp = require('gulp');
var sync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var esLintTask = require('./eslint.js');

var browserifyOpts = {
    debug: true,
    standalone: appName
};

var babelOpts = {
    presets: ['es2015']
};

var bundleJS = function(bundler, minify) {
    var stream = bundler
        .bundle()
        .on('error', function(err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source(appName + '.js'))
        .pipe(buffer())

    var compile = stream
        .pipe($.clone())
        .pipe($.rename(appName + '.js'))
        .pipe(gulp.dest(dist));

    if (minify) {
        var minify = stream
            .pipe($.clone())
            .pipe($.sourcemaps.init({ loadMaps: true }))
            .pipe($.rename(appName + '.min.js'))
            .pipe($.uglify())
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(dist))
        return merge(compile, minify);
    }
    console.log('re-bundled');
    return compile.pipe(sync.reload({ stream: true }));
};

module.exports = {
    dev: function() {
        var args = _.extend(browserifyOpts, {
            watch: true,
            cache: {},
            packageCache: {}
        });
        var bundler = watchify(browserify(entryPoint, args)).transform([babelify, babelOpts]);
        bundler.on('update', function() {
            return esLintTask().on('error', function() {})
                .pipe(bundleJS(bundler));
        });
        return bundleJS(bundler, true);
    },
    dist: function() {
        var bundler = browserify(entryPoint, browserifyOpts).transform([babelify, babelOpts]);
        return bundleJS(bundler, true);
    }
};
