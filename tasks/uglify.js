module.exports = {
    dist: {
        options: {
            sourceMap: true,
            sourceMapIncludeSources: true,
            sourceMapIn: '<%= dist %>/<%= appName %>.js.map',
            sourceMapName: '<%= dist %>/<%= appName %>.js.map'
        },
        files: {
            '<%= dist %>/<%= appName %>.min.js': ['<%= dist %>/<%= appName %>.js'],
        },
    }
};
