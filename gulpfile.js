const gulp        = require('gulp'),
			aa_concat   = require('gulp-concat'),
			aa_rename   = require('gulp-rename'),
			aa_uglify   = require('gulp-uglify'),
			rigger      = require('gulp-rigger'),
			sourcemaps  = require('gulp-sourcemaps'),
			sass        = require('gulp-sass'),
			babel       = require('gulp-babel'),
			browserSync = require('browser-sync').create();

const devRoot = "script/dev/", prodRoot = "script/prod/";


const paths = {
	htmlfiles: [
		'rigger_tempates/*.html',
		'rigger_tempates/template/*.html'
	],
	jsfiles  : [
		devRoot + 'script.js'
	]
};

gulp.task('sass', () => {
	gulp.src(['style/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'})
			.on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('style/'));
});

// ================== Main working scope ==================
gulp.task('aa-concat', () => {

	return gulp.src(paths.jsfiles)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(aa_concat('concat.js'))
		.pipe(gulp.dest(devRoot))
		.pipe(aa_rename('app-uglify.js'))
		.pipe(aa_uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(prodRoot));

});

gulp.task('html:build', function() {
	gulp.src('rigger_tempates/*.html')
		.pipe(rigger())
		.pipe(gulp.dest("./"));
});

gulp.task('watch', () => {

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(paths.htmlfiles, ['html:build'])

	gulp.watch(['*.html'])
		.on('change', browserSync.reload);

	gulp.watch(paths.jsfiles, ['aa-concat'])
		.on('change', browserSync.reload);

	gulp.watch(['style/**/*.scss', 'style/style.css'], ['sass'])
		.on('change', browserSync.reload);

});

gulp.task('default', ['aa-concat'], () => {
});