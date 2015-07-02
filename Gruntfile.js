module.exports = function(grunt) {

    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        all: {
            options: {
                port: 8080,
                hostname: "localhost",
                bases: ['.'],
                livereload: true
            }
        },

        // uglify插件的配置信息
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: [{
                    expand: true,
                    //相对路径
                    cwd: 'src/js/',
                    src: '*.js',
                    dest: 'build/js'
                }]
            }
        },




        // uglify: {
        //     build: {

        //         files: [{
        //             // 压缩js文件
        //             expand: true,
        //             cwd: 'src/js'
        //             src: '**/*.js',
        //             dest: 'build/js/',
        //             ext: '.js'
        //         }]
        //     }
        // },
        cssmin: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
            },
            my_target: {
                files: [{
                    expand: true,
                    //相对路径
                    cwd: 'src/css/',
                    src: '*.css',
                    dest: 'build/css/'
                }]
            }
        },
        less: {
            lessall: {
                files: [{
                    expand: true,
                    cwd: 'src/less',
                    src: '*.less',
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            less: {
                files: ['**/*.less'],
                tasks: ['less']
            },
            client: {
                files: ['src/*.html', 'src/css/*', 'src/js/*', 'src/images/**/*'],
                options: {
                    livereload: true
                }
            }
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 // png图片优化水平，3是默认值，取值区间0-7
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },
    });

    // 告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // 告诉grunt当我们在终端中输入grunt时需要做些什么
    grunt.registerTask('default', ['uglify', 'less', 'cssmin', 'imagemin']);
    grunt.registerTask('live', ['watch']);

};
