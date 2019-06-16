// Generated on 2019-06-15 using generator-angular 0.16.0
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    devMode = false,
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline;

sass.compiler = require('node-sass');

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch("./app/**/*.html").on("change", reload);
});

gulp.task('js', function() {
    return pipeline(
        gulp.src('./app/libs/**/*.js'),
        uglify(),
        gulp.dest('./app/dist/js')
    )
})

gulp.task('scss', function() {
    return gulp.src("./app/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./app/dist/css'));
})

gulp.task('scss:watch', function() {
    gulp.watch('./app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('./app/scss/**/*.scss').on('change', reload);
})

gulp.task('default', gulp.parallel('scss', 'scss:watch', 'serve', 'js'));