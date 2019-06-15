// Generated on 2019-06-15 using generator-angular 0.16.0
'use strict';

var gulp = require('gulp'),
    scss = require('gulp-scss'),
    livereload = require('gulp-livereload');

gulp.task('scss', function() {
    gulp.src('scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/*.scss', ['scss']);
})