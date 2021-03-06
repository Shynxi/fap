var config  = require('../config')
var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')

var paths = {
    src: [
        path.join(config.root.src, config.tasks.media.src, '/**'),
        path.join('!' + config.root.src, config.tasks.media.src, '/README.md')
    ],
    dest: path.join(config.root.dest, config.tasks.media.dest)
}

var mediaTask = function() {
    return gulp.src(paths.src)
        .pipe(changed(paths.dest)) // Ignore unchanged files
        .pipe(gulp.dest(paths.dest))
}

gulp.task('media', mediaTask)
module.exports = mediaTask
