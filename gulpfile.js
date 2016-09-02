var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var babel = require( 'gulp-babel' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var uglifycss = require( 'gulp-uglifycss' );
var nodemon = require( 'gulp-nodemon' );
var flatmap = require( 'gulp-flatmap' );

gulp.task('default', ['sass', 'babel', 'nodemon'], function(){
	gulp.watch('./public/scss/*.scss', ['sass']);
	gulp.watch('./public/js/*.js', ['babel']);
});


gulp.task('nodemon', function () {
  nodemon({ script: 'server.js'
          , ext: 'html js scss'})
})

gulp.task('sass', function(){
	return gulp.src(['./public/scss/*.scss', './public/scss/directives/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('bundle.css'))
		.pipe(uglifycss({
			"uglyComments": true,
		}))
		.pipe(gulp.dest('public/uglify/css'))
});

gulp.task('babel', function() {
  var files = ['public/js/*.js'];

  gulp.src( files )
	.pipe( babel( { presets: ['es2015'] } ) )
    .pipe( uglify() )
    .pipe( gulp.dest( './public/uglify/js/' ) );
});
