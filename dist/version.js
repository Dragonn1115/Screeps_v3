module.exports = function(grunt) {

    // 准备

    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')

    var currentdate = new Date();

    // 输入当前时间和分支
    grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
    grunt.log.writeln('Branch: ' + branch)


    grunt.initConfig({

        // 此处省略
        screeps: {},
        clean: {},
        copy: {},

        // 使用当前时间戳添加版本变量
        file_append: {
          versioning: {
            files: [
              {
                append: "\nglobal.SCRIPT_VERSION = "+ currentdate.getTime() + "\n",
                input: 'dist/version.js',
              }
            ]
          }
        },

    })

    grunt.registerTask('default',  ['clean', 'copy:screeps', 'file_append:versioning', 'screeps']);
}
global.SCRIPT_VERSION = 1679413759584
