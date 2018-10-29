'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var target = grunt.option('target') || "";
    var config = {};
    config.dist = decideDist();

    grunt
    grunt.initConfig({
        config: grunt.file.readJSON(target + "package.json"),

        uglify: {
            options: {
                preserveComments: 'some'
            },
            build: {
                src:   target +  'build/pdf.js',
                dest: target +  'build/pdf.min.js'
            }          
        },
        copy: {
            dist_root_files: {
                files: [{
                        cwd: '',
                        src: 'web/**/*',
                        dest: config.dist.build,
                        expand: true
                    },{
                        cwd: '',
                        src: 'build/**/*',
                        dest: config.dist.build,
                        expand: true
                    }
                    ]
            }
        }
    })
    grunt.registerTask('bundle', [
        'uglify',
        'copy:dist_root_files'
    ]);

    function decideDist()
    {
        if(process.env.buildFor == 'deploy')
        {
            return {
                build: 'dist'
             }
        }
        else
        {
            return {
                build: '../../../dist/web-sites/pdf-viewer-js'
            }
        }
    }
};
