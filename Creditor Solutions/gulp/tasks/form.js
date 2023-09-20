const gulp = require('gulp');
var inject = require('gulp-inject');

module.exports = {
    injectScripts: () => {
        const target = gulp.src('src/form.html');
        const sources = gulp.src(['src/form/js/*.js', 'src/form/css/*.css'], {read: false});
        return target
          .pipe(
            inject(sources, {
              transform: function (filepath) {
                if (filepath.slice(-4) === '.css') {
                    return `<link rel="stylesheet" href=".${filepath}"/>`
                }
                if (filepath.slice(-3) === '.js') {
                    return `<script src=".${filepath}"></script>`
                }
                // Use the default transform as fallback:
                return inject.transform.apply(inject.transform);
              },
            })
          )
          .pipe(gulp.dest("src"));
    },
    moveFormFiles: () => {
        return gulp.src('src/form/**/*')
        .pipe(gulp.dest('dist/src/form'));
    }
}