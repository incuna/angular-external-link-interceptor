module.exports = function (grunt) {
    'use strict';

    if (grunt.option('help')) {
        require('load-grunt-tasks')(grunt);
    } else {
        require('jit-grunt')(grunt, {
            ngtemplates: 'grunt-angular-templates'
        });
    }

    require('time-grunt')(grunt);

    grunt.initConfig({
        // Configurable paths
        config: {
            modules: 'modules',
            files: {
                lint: [
                    '<%= config.modules %>/**/scripts/**/*.js',
                    '!<%= config.modules %>/**/templates.js',
                    'Gruntfile.js'
                ]
            }
        },
        eslint: {
            all: {
                options: {
                    config: '.eslintrc'
                },
                src: '<%= config.files.lint %>'
            }
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: '<%= config.files.lint %>'
        }
    });

    grunt.registerTask('lint', [
        'eslint',
        'jscs'
    ]);

    grunt.registerTask('test', [
        'lint'
    ]);

};
