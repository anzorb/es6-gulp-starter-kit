module.exports = {
    options: {
        livereload: true
    },
    js: {
        files: '<%= dist %>/<%= appName %>.js',
        tasks: ['eslint']
    },
};
