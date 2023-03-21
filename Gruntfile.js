module.exports = function (grunt) {
    require('time-grunt')(grunt);
  
    // 从 .screeps.json 拉取默认配置（包括用户名和密码）
    var config = require('./.screeps.json')
  
    // 允许 grunt 配置项覆盖默认配置
    var branch = grunt.option('branch') || config.branch;
    var email = grunt.option('email') || config.email;
    var token = grunt.option('token') || config.token;
    var ptr = grunt.option('ptr') ? true : config.ptr
    var private_directory = grunt.option('private_directory') || config.private_directory;
  
  
    var currentdate = new Date();
    grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
    grunt.log.writeln('Branch: ' + branch)
  
    // 加载需要的任务
    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')
    grunt.loadNpmTasks("grunt-jsbeautifier")
    grunt.loadNpmTasks("grunt-rsync")
  
    grunt.initConfig({
  
      // 将 dist 文件夹中的所有文件推送到 screeps。 dist 文件夹中的内容
      // 以及要发送的内容取决于所使用的任务。
      screeps: {
        options: {
          email: email,
          token: token,
          branch: branch,
          ptr: ptr
        },
        dist: {
          src: ['dist/*.js']
        }
      },
  
      // 将所有源文件复制到 dist 文件夹
      // 通过将路径分隔符转换为下划线来展平文件夹结构
      copy: {
        // 将游戏代码推送到dist文件夹，以便在将其发送到 screeps 服务器之前可以对其进行修改。
        screeps: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: '**',
            dest: 'dist/',
            filter: 'isFile',
            rename: function (dest, src) {
              // 通过将文件夹分隔符替换成下划线来重命名文件
              return dest + src.replace(/\//g,'_');
            }
          }],
        }
      },
  
  
      // 将文件复制到客户端用于提交到私有服务器的文件夹。
      // 使用 rsync，以便客户端仅上传被更改的文件。
      rsync: {
          options: {
              args: ["--verbose", "--checksum"],
              exclude: [".git*"],
              recursive: true
          },
          private: {
              options: {
                  src: './dist/',
                  dest: private_directory,
              }
          },
      },
  
  
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
  
  
      // 移除 dist 文件夹中的所有文件。
      clean: {
        'dist': ['dist']
      },
  
  
      // 应用代码样式
      jsbeautifier: {
        modify: {
          src: ["src/**/*.js"],
          options: {
            config: '.jsbeautifyrc'
          }
        },
        verify: {
          src: ["src/**/*.js"],
          options: {
            mode: 'VERIFY_ONLY',
            config: '.jsbeautifyrc'
          }
        }
      }
  
    })
  
    // 将它们组合为一个默认任务。
    grunt.registerTask('default',  ['clean', 'copy:screeps',  'file_append:versioning', 'screeps']);
    grunt.registerTask('private',  ['clean', 'copy:screeps',  'file_append:versioning', 'rsync:private']);
    grunt.registerTask('test',     ['jsbeautifier:verify']);
    grunt.registerTask('pretty',   ['jsbeautifier:modify']);
  }