/**
 * GULP 配置文件
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// 启动指令     起服务
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    //browserSync 自动刷新
    gulp.watch(["./*.html", "src/*.js"]).on('change', browserSync.reload);

});

//默认启动指令
gulp.task('default', ['browserSync']);