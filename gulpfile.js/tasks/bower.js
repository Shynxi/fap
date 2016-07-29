var config      = require('../config')
if(!config.tasks.bower) return

var bower = require('gulp-bower')
var gulp  = require('gulp')

gulp.task('bower', function() {
    return bower({ directory: config.tasks.bower.src })
        .pipe(gulp.dest(config.tasks.bower.dest))
});