module.exports = function() {
    var gulp = require('gulp'),
        config = require('./config.js'),
        esdoc = require('gulp-esdoc');

    return gulp.src(['./src/js/**'])
        .pipe(esdoc({ destination: './docs' }));
};
