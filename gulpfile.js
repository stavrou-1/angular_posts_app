// Generated on 2019-06-15 using generator-angular 0.16.0
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline,
    eslint = require('gulp-eslint'),
    jasmine = require('gulp-jasmine-phantom')

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
    gulp.src([
        './app/libs/angular.1.7.8.js',
        './app/libs/angular-mocks.1.7.8.js',
        './app/libs/angular-ui-router.js',
        './app/libs/jquery.js',
        './app/libs/underscore.1.9.1.js',
        './app/libs/restangular.1.6.1.js',
        ])
        .pipe(concat('dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist/js'));
    
    gulp.src([
        './app/scripts/app.js',
        './app/scripts/services/**/*.js',
        './app/scripts/directives/**/*.js',
        './app/scripts/controllers/**/*.js'
        ])
        .pipe(concat('main.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./app/dist/main'))
})

gulp.task('js:watch', function() {
    gulp.watch('./app/scripts/**/*.js', gulp.parallel('js'));
    gulp.watch('./app/scripts/**/*.js').on('change', reload);
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

gulp.task('lint', function() {
    return gulp.src(['./app/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
})

gulp.task('test', function(done) {
    return gulp.src('test/spec/controllers/main.js')
        .pipe(jasmine({
            vendor:[
                './app/libs/angular.1.7.8.js',
                './app/libs/angular-mocks.1.7.8.js',
                './app/libs/angular-ui-router.js',
                './app/libs/jquery.js',
                './app/libs/underscore.1.9.1.js',
                './app/libs/restangular.1.6.1.js',
                './app/scripts/**/*.js'
            ],
            integration: true,
            keepRunner: true,
            watched: false,
            included: true,
            served: true,
        }))
})

gulp.task('default', gulp.parallel('scss', 'scss:watch', 'serve', 'js', 'lint'));