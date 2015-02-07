var gulp = require('gulp');
var gulpTasks = require('./index');

gulp.task('tasks', function () {

    gulp.src('./test/fixtures/example.json')
        .pipe(gulpTasks());

});

gulp.task('default', [], function () {});