const gulp = require('gulp');

module.exports = function files() {
  gulp.src('src/*.txt')
  .pipe(gulp.dest('dist/'));
  return gulp.src('src/files/*')
    .pipe(gulp.dest('dist/files'));
};