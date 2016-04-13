module.exports = {
    options: {
        base: '.'
    },
    dist: {
        files: {
            '<%= dist %>/<%= appName %>.js.map': ['<%= dist %>/<%= appName %>.js'],
        }
    }
};
