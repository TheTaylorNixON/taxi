// 'use strict';

// global.$ = {
//     config: require('./gulp/config'),
//     path: {
//         task: require('./gulp/paths/tasks.js'),
//         cssFoundation: require('./gulp/paths/css.foundation.js'),
//         jsFoundation: require('./gulp/paths/js.foundation.js')
//     },
//     gulp: require('gulp'),
//     del: require('del'),
//     browserSync: require('browser-sync').create(),
//     gp: require('gulp-load-plugins')()
// };

// path.task.forEach(function(taskPath) {
//     require(taskPath)();
// });

// $.gulp.task('default', $.gulp.series(
//     'clean',
//     $.gulp.parallel(
//         'copy:images',
//         'copy:fonts',
//         'copy:js',
//         'css:foundation',
//         'js:foundation',
//         'sprite:svg'
//     ),
//     $.gulp.parallel(
//         'sass',
//         'pug'
//     ),
//     $.gulp.parallel(
//         'watch',
//         'serve'
//     )
// ));

'use strict';

const gulp = require('gulp'),
      del = require('del'),
      browserSync = require('browser-sync').create(),       // var
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      sassGlob= require('gulp-sass-glob'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      cssunit = require('gulp-css-unit'),
      normalize = require('node-normalize-scss');

gulp.task('clean', function () {
    return del('./app')
});

gulp.task('copy:fonts', function() {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('./app/fonts'));
});

gulp.task('copy:images', function() {
    return gulp.src('./source/img/**/*.*')
        .pipe(gulp.dest('./app/img'));
});

gulp.task('copy:js', function() {
    return gulp.src('./source/js/**/*.js')
        .pipe(gulp.dest('./app/js'));
});

gulp.task('html', function () {
    return gulp.src('./source/pug/pages/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./app'))
});

gulp.task('css', function () {
    return gulp.src('./source/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({includePaths: require('node-normalize-scss').includePaths}).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 3 versions'], }))
        .pipe(cssunit({ type: 'px-to-rem', rootSize: 16 }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
});

gulp.task('serve', function() {
    browserSync.init({
        open: false,
        notify: false,
        directory: true,
        // index: 'about.html',
        server: {
            baseDir: './app'
        }
    });
    browserSync.watch('./app/**/*.*', browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch('./source/sass/**/*.scss', gulp.series('css'));
    gulp.watch('./source/pug/**/*.pug', gulp.series('html'));
    gulp.watch('./source/images/**/*.*', gulp.series('copy:images'));
    gulp.watch('./source/fonts/**/*.*', gulp.series('copy:fonts'));
    gulp.watch('./source/js/**/*.*', gulp.series('copy:js'));
});


gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'copy:images',
        'copy:fonts',
        'copy:js'
    ),
    gulp.parallel(
        'html',
        'css'
    ),
    gulp.parallel(
        'watch',
        'serve'
    )
));