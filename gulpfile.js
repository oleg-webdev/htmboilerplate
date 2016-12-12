const gulp        = require('gulp'),
			aa_concat   = require('gulp-concat'),
			aa_rename   = require('gulp-rename'),
			aa_uglify   = require('gulp-uglify'),
			sourcemaps  = require('gulp-sourcemaps'),
			sass        = require('gulp-sass'),
			babel       = require('gulp-babel'),
			browserSync = require('browser-sync').create();

const devRoot = "script/dev/", prodRoot = "script/prod/";
const processFiles = [
	devRoot + 'script.js'
];

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

	return gulp.src(processFiles)
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

gulp.task('watch', () => {

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(['index.html'])
		.on('change', browserSync.reload);

	gulp.watch(processFiles, ['aa-concat'])
		.on('change', browserSync.reload);

	gulp.watch(['style/**/*.scss', 'style/style.css'], ['sass'])
		.on('change', browserSync.reload);

});

gulp.task('default', ['aa-concat'], () => {
});