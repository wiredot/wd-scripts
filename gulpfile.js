'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	replace = require('gulp-replace'),
	minify = require('gulp-minify');

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(replace('{version}', '0.2.1'))
    	.pipe(minify({
	        ext:{
	            min:'.min.js'
	        },
	    }))
	    .pipe(gulp.dest('dist'))
		.pipe(notify({
			message: 'all done',
			title: 'JS'
		}))
});

gulp.task('themes', function() {
	return gulp.src( 'src/themes/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass())
		.pipe(gulp.dest( 'dist/themes/'))
		.pipe(notify({
			message: 'all done',
			title: 'SCSS'
		}));
});

gulp.task('default', ['themes', 'js']);

gulp.task('watch', function() {
	gulp.watch( 'src/js/*.js', ['js']);
	gulp.watch( 'src/themes/**/*.scss', ['themes']);
});