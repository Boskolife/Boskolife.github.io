const gulp = require('gulp');
var inject = require('gulp-inject');

module.exports = {
    injectScripts: () => {
        const target = gulp.src('src/form.html');
        const sources = gulp.src(['src/form/**/*.js', 'src/form/**/*.css'], {read: false});
        return target.pipe(inject(sources))
        .pipe(gulp.dest('src'));
    },
    moveFormFiles: () => {
        return gulp.src('src/form/**/*')
        .pipe(gulp.dest('dist/src/form'));
    }
}