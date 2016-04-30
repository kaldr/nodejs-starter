'use strict'
module.exports = (grunt)->
    grunt.initConfig {
        pkg: grunt.file.readJSON 'package.json',
        concat:
            options:
                separator:";"
            dist:
                src:['modules/source/css/*.css']
                dest:'dist/<%= pkg.name %>.css'
        uglify:
            options:
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            dist:
                src:['<%= concat.dist.dest %>']
                dest:'dist/<%= pkg.name %>.min.css'
    }
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-concat'

    grunt.registerTask 'default',['concat','uglify']
