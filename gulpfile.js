var gulp = require('gulp');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
var dest = require('gulp-dest');
var runSequence = require('run-sequence');

gulp.task('js', function() {
 return  gulp.src('build/pdf.js')
  .pipe(uglify())
  .pipe(dest('build', {ext: 'min.js'}))
  .pipe(gulp.dest('./'))
});

gulp.task('copybuild', function() {
 return  gulp.src('build/**/*')
  .pipe(gulp.dest('dist/build'))
});


gulp.task('copyweb', function() {
 return  gulp.src('web/**/*')
  .pipe(gulp.dest('dist/web'))
});

gulp.task('build', function(callback) {
  runSequence('js',
              ['copybuild', 'copyweb']);
});

gulp.task('default', ['build']);
