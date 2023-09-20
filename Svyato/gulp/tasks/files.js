const gulp = require('gulp');

module.exports = function jquery() {
  gulp.src('src/*.txt')
  .pipe(gulp.dest('dist/'));
  return gulp.src('src/files/*')
    .pipe(gulp.dest('dist/files'));
};