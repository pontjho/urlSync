var jsPath = ['urlSync.js'];
var libPath = ['bower_components/angular/angular.js',
               'lib/momentjs/moment.js'];

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(jsPath)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src(jsPath)
        .pipe(rename('url-sync.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['lint', 'scripts']);
