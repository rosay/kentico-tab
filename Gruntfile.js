module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('node_modules/grunt/package.json'),
        // Uglify
        uglify: {
            test: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapName: 'test/src/background.js'
                },
                src: 'src/*.js',
                dest: 'test/background.js'
            }
        },
        // Copy manifest with background.js
        copy: {
            test: {
                files: [
                    {src: 'src/manifest.json', dest: 'test/manifest.json', filter: 'isFile'}
                ]
            },
            prod: {
                files: [
                    {src: ['test/manifest.json', 'background.js'], dest: ['prod/manifest.json', 'prod/background.js'], filter: 'isFile'}
                ]
            }
        },
        // make a zipfile to publish to Chrome Web Store
        compress: {
            prod: {
                options: {
                    archive: 'k-tab.zip'
                },
                files: [
                    {src: ['test/*'],  filter: 'isFile', flatten: true}, // includes files in path
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('test',   ['uglify', 'copy']);
    grunt.registerTask('prod', ['compress']);
};
