var config      = require('../config')
var gulp        = require('gulp')
var path        = require('path')

var paths = {
    src: [
        path.join(config.root.dest, config.tasks.images.dest, '/**/*.{' + config.tasks.images.extensions + '}'),
        path.join(config.root.dest, config.tasks.fonts.dest, '/**/*.{' + config.tasks.fonts.extensions + '}'),
        path.join(config.root.dest, config.tasks.css.dest, '/**/*.{' + config.tasks.css.extensions + '}'),
        path.join(config.root.dest, config.tasks.js.dest, '/**/*.{' + config.tasks.js.extensions + '}'),
        '*!README.md'
    ],
    dest: path.join(config.root.lightmodule)
}

var cpToWebresourcesTask = function() {
    return gulp.src(paths.src,  {base: config.root.dest})
        .pipe(gulp.dest(paths.dest))
}

gulp.task('cpToWebresources', cpToWebresourcesTask)
module.exports = cpToWebresourcesTask
