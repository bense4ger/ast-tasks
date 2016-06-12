const gulp = require('gulp');
const rename = require('gulp-rename');
const version = require('./package.json').version;

const dirs = Object.freeze({
    input: './input/**/*.js',
    output: './output'
});

gulp.task('move', () => {
    gulp.src(dirs.input)
        .pipe(rename((path) => {
            path.basename += `.${version}`
        }))
        .pipe(gulp.dest(dirs.output));
});

gulp.task('default', () => {
    gulp.watch('./input/**/*.js', ['move']);
});