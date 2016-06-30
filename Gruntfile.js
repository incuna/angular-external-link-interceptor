'use strict';

var _ = require('lodash');
var fs = require('fs');

module.exports = function (grunt) {

    var projectTemplates = {};

    var modules_dir = 'modules/';
    var modules = fs.readdirSync(modules_dir).filter(function (file) {
        return fs.statSync(modules_dir + file).isDirectory();
    });

    _.each(modules, function (name) {
        var module_path = 'angular-' + name + '.templates';
        projectTemplates[name] = {
            cwd: 'modules/' + name,
            src: '**/*.html',
            dest: 'modules/' + name + '/templates.js',
            options: {
                module: module_path,
                standalone: true
            }
        };
    });

    if (grunt.option('help')) {
        require('load-grunt-tasks')(grunt);
    } else {
        require('jit-grunt')(grunt, {
            ngtemplates: 'grunt-angular-templates',
            force: 'grunt-force-task',
            concat: 'grunt-contrib-concat'
        });
    }

    require('time-grunt')(grunt);

    var concatConfig = {
        target: {
            src: [
                'modules/**/**/*.js'
            ],
            dest: 'dist/angular-link-interceptor.js'
        }
    };

    var uglifyConfig = {
        target: {
            files: {
                'dist/angular-link-interceptor.min.js': 'dist/angular-link-interceptor.js'
            }
        },
        options: {
            compress: {
                drop_console: true
            }
        }
    };

    grunt.initConfig({
        // Configurable paths
        config: {
            modules: 'modules',
            lib: 'bower_components',
            tests: 'tests',
            files: {
                lint: [
                    '<%= config.modules %>/**/scripts/**/*.js',
                    '!<%= config.modules %>/**/templates.js'
                ],
                scripts: '<%= config.modules %>/**/*.js',
                templatesJS: '<%= config.modules %>/**/templates.js',
                templatesHTML: '<%= config.modules %>/**/*.html'
            }
        }
    });

    grunt.config.merge({
        watch: {
            templates: {
                files: '<%= config.modules %>/**/*.html',
                tasks: 'build'
            },
            scripts: {
                files: '<%= config.modules %>/**/scripts/**/*.js',
                tasks: ['build', 'eslint']
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
        },
        ngtemplates: _.extend({
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            },
            projectTemplates
        ),
        concat: concatConfig,
        uglify: uglifyConfig
    });

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);

    grunt.registerTask('lint', [
        'eslint',
        'jscs'
    ]);

    grunt.registerTask('build', [
        'ngtemplates',
        'concat',
        'uglify'
    ]);
};
