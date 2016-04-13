module.exports = {
    dev: {
        options: {
            watch: true,
            transform: [
                ['babelify', {
                    presets: ['es2015']
                }]
            ],
            browserifyOptions: {
                debug: true,
                standalone: '<%= appName %>'
            }
        },
        files: {
            '<%= dist %>/<%= appName %>.js': '<%= src %>/Foo.js'
        }
    }
}
