var gulp = require('gulp')
var sass = require('gulp-sass')
// var babel = require('gulp-babel')

gulp.task('default', ['sass']);

gulp.task('sass', function(){
	return gulp.src(['./public/scss/*.scss', './public/scss/directives/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
});

gulp.watch('./public/**/*.scss', ['sass']);
