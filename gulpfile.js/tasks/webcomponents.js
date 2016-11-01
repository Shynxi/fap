var config  = require('../config')
var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')
var vulcanize = require('gulp-vulcanize')

var paths = {
    src: [
        path.join(config.root.src, config.tasks.webcomponents.src, '/**'),
        path.join('!' + config.root.src, config.tasks.webcomponents.src, '/README.md')
    ],
    dest: path.join(config.root.dest, config.tasks.webcomponents.dest)
}

var webcomponentsTask = function() {
    return gulp.src(paths.src)
        .pipe(changed(paths.dest)) // Ignore unchanged files
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripComments: true,
            inlineScripts: true,
            inlineCss: true,
            stripExcludes: false
        }))
        .pipe(gulp.dest(paths.dest))
}

gulp.task('webcomponents', webcomponentsTask)
module.exports = webcomponentsTask
