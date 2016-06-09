#### ES6 + Babel + Gulp starter kit by Anzor Bashkhaz

This starter-kit includes everything you need to write ES6 code, along with tests, documentation, and live reloading.

##### Requirements
* [NPM](https://nodejs.org/)
* Gulp
    `npm install -g gulp-cli`

##### Install
    npm install

##### Tasks
    gulp dev will compile ES6 code, open demo app in browser, and refresh on changes.
    gulp dist will compile, minify, extract sourcemaps
    gulp karma:tdd compile, open browser and wait for code changes (test driven development)
    gulp karma:ci compile, generate coverage for Jenkins
    npm run docs generate documentation

##### Issues

1. gulp-esdoc blows up due to https://github.com/nanopx/gulp-esdoc/issues/4, so it was commented out of the gulpfile until it's fixed. Use npm run docs instead
