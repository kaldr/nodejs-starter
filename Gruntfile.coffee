'use strict'
module.exports = (grunt)->
    config=
        pkg: grunt.file.readJSON 'package.json'
        jshint:
            files:['modules/grunt/source/js/CommunityOP/**/*.js']
        concat:
            options:
                separator:";"
            dist:
                src:'<%= jshint.files %>'
                dest:'dist/<%= pkg.name %>.js'
        uglify:
            options:
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            dist:
                src:['<%= concat.dist.dest %>']
                dest:'dist/<%= pkg.name %>.min.js'

    grunt.initConfig config
    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-concat'

    grunt.registerTask 'default',['jshint','concat','uglify']
