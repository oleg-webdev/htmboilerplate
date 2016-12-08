var gulp = require('gulp'),
		aa_concat = require('gulp-concat'),
		aa_rename = require('gulp-rename'),
		aa_uglify = require('gulp-uglify'),
		aa_sourcemaps = require('gulp-sourcemaps'),
		browserSync = require('browser-sync').create();

var devRoot = "script/dev/", prodRoot = "script/prod/";
var processFiles = [
	devRoot + 'script.js'
];

// ================== Main working scope ==================
gulp.task('aa-concat', function() {

	return gulp.src(processFiles)
		.pipe(aa_sourcemaps.init())
		.pipe(aa_concat('concat.js'))
		.pipe(gulp.dest(devRoot))
		.pipe(aa_rename('app-uglify.js'))
		.pipe(aa_uglify())
		.pipe(aa_sourcemaps.write('./'))
		.pipe(gulp.dest(prodRoot));
});

gulp.task('watch', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(processFiles, ['aa-concat'])
		.on('change', browserSync.reload);
	gulp.watch(['index.html', 'style/style.css'])
		.on('change', browserSync.reload);
});

gulp.task('default', ['aa-concat'], function() {});