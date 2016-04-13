module.exports = function() {
    var gulp = require('gulp'),
        config = require('./config.js'),
        eslint = require('gulp-eslint');
    return gulp.src([config.src + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};
