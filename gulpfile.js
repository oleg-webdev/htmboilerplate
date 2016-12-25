const gulp        = require('gulp'),
			concat      = require('gulp-concat'),
			rename      = require('gulp-rename'),
			uglify      = require('gulp-uglify'),
			rigger      = require('gulp-rigger'),
			sourcemaps  = require('gulp-sourcemaps'),
			sass        = require('gulp-sass'),
			babel       = require('gulp-babel'),
			browserSync = require('browser-sync').create();

const devRoot = "script/dev/", prodRoot = "script/prod/";

const paths = {
	htmlfiles: [
		'htmlsrc/*.html',
		'htmlsrc/template/*.html'
	],
	jsfiles  : [
		devRoot + 'partials/*.js',
		devRoot + 'script.js',
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
		.pipe(concat('concat.js'))
		.pipe(gulp.dest(devRoot))
		.pipe(rename('app-uglify.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(prodRoot));

});

gulp.task('html:build', function() {
	gulp.src('htmlsrc/*.html')
		.pipe(rigger())
		.pipe(gulp.dest("./"));
});

gulp.task('watch', () => {

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(paths.htmlfiles, ['html:build']);

	gulp.watch(['*.html'])
		.on('change', browserSync.reload);

	gulp.watch(paths.jsfiles, ['aa-concat'])
		.on('change', browserSync.reload);

	gulp.watch(['style/**/*.scss', 'style/style.css'], ['sass'])
		.on('change', browserSync.reload);

});

gulp.task('default', ['aa-concat'], () => {
});