var config = require('../config')
var changed = require('gulp-changed')
var gulp = require('gulp')
var path = require('path')
var vulcanize = require('gulp-vulcanize')
var handleErrors = require('../lib/handleErrors')
var gulpif       = require('gulp-if')
var htmlmin      = require('gulp-htmlmin')

var paths = {
  src: [
    path.join(config.root.src, config.tasks.webcomponents.src, '/**'),
    path.join('!' + config.root.src, config.tasks.webcomponents.src, '/README.md')
  ],
  dest: path.join(config.root.dest, config.tasks.webcomponents.dest)
}

var webcomponentsTask = function () {
  return gulp.src(paths.src)
  .pipe(vulcanize({
    abspath: '',
    excludes: [],
    stripComments: true,
    inlineScripts: true,
    inlineCss: true,
    stripExcludes: false
  }))
  .on('error', handleErrors)
  .pipe(gulpif(global.production, htmlmin(config.tasks.html.htmlmin)))
  .pipe(gulp.dest(paths.dest))
}

gulp.task('webcomponents', webcomponentsTask)
module.exports = webcomponentsTask
