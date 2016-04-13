var gulp = require('gulp');

// bundle up the modules and run through babel
gulp.task('browserify', ['eslint'], require('./tasks/browserify.js').dev);

// bundle up the modules and run through babel, minify and generate sourcemaps
gulp.task('browserify:dist', ['eslint'], require('./tasks/browserify.js').dist);

// lint
gulp.task('eslint', require('./tasks/eslint.js'));

// generate documentation
gulp.task('esdoc', require('./tasks/esdoc.js'));

// serve demo app
gulp.task('sync', ['browserify'], require('./tasks/sync.js'));

// run tests while watching for changes and browser open for debugging
gulp.task('karma:tdd', require('./tasks/karma.js').tdd);

// run tests, generate coverage
gulp.task('karma:ci', require('./tasks/karma.js').ci);

gulp.task('dev', ['sync']);
//gulp.task('dist', ['browserify:dist', 'esdoc']);
gulp.task('dist', ['browserify:dist']);
