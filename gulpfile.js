var gulp = require('gulp');
var sass = require('gulp-sass');
// var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

gulp.task('default', ['sass']);

gulp.task('sass', function(){
	return gulp.src(['./public/scss/*.scss', './public/scss/directives/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('bundle.css'))
		.pipe(uglifycss({
			"uglyComments": true,
		}))
		.pipe(gulp.dest('public/uglify/css'))
});

gulp.watch('./public/**/*.scss', ['sass']);
