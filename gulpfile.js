const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function () {
  gulp.src('lib/**/*')
  .pipe(babel({
    "blacklist": [],
    "stage": 0
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('publish', function () {
  gulp.src('lib/**/*')
  .pipe(babel({
    "blacklist": [],
    "stage": 0
  }))
  .pipe(gulp.dest('bin'));
});

gulp.task('test', ['default'], function () {
  gulp.src('test/**/*')
  .pipe(babel({
    "blacklist": [],
    "stage": 0
  }))
  .pipe(gulp.dest('test-transpiled'));
});
