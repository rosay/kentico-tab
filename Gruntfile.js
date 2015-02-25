module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('node_modules/grunt/package.json'),
        // 1. Uglify
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapName: 'dev/src/background.js'
                },
                src: 'src/*.js',
                dest: 'dev/background.js'
            }
        },
        // Copy manifest with background.js
        copy: {
            dev: {
                files: [
                    {src: 'src/manifest.json', dest: 'dev/manifest.json', filter: 'isFile'}
                ]
            },
            prod: {
                files: [
                    {src: ['dev/manifest.json', 'background.js'], dest: ['prod/manifest.json', 'prod/background.js'], filter: 'isFile'}
                ]
            }
        },
        // make a zipfile to publish to Chrome Web Store
        compress: {
            prod: {
                options: {
                    archive: 'k-tab-prod.zip'
                },
                files: [
                    {src: ['dev/*'],  filter: 'isFile', flatten: true}, // includes files in path
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('dev',   ['uglify', 'copy']);
    grunt.registerTask('prod', ['compress']);
};
