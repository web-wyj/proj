var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

const babelConfig = {
    'presets': ['es2015']
};
const watchFiles = [
    'src/**/*.js',
    'src/**/*.less',
    './*.html'
];
const beforeConcatTasks = [
    'less',
    'babel'
];
const browserSyncConfig = {
    server: {
        baseDir: './',
        index: './markdown-editor.html'
    },
    port: 8080
};
const reloadConfig = {
    stream: true
};

gulp.task('less', () => {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('babel', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel(babelConfig))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('concat', beforeConcatTasks, () => {
    gulp.src('./public/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/latest'))
        .pipe(reload(reloadConfig));
    gulp.src('./public/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/latest'))
        .pipe(reload(reloadConfig));
})

gulp.task('browser-sync', () => {
    browserSync(browserSyncConfig);
});

gulp.task('watch', ['concat'], () => {
    gulp.watch(watchFiles, ['concat']);
});

gulp.task('server-start', ['browser-sync', 'watch']);