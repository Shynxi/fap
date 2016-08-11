var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

var lightmoduleTask = function(cb) {
  global.production = true
  global.lightmodule = true
  var tasks = getEnabledTasks('production')
  gulpSequence('clean', 'bower', 'production', tasks.assetTasks, tasks.codeTasks, config.tasks.production.rev ? 'rev': false, 'size-report', 'static', 'cpToWebresources', cb)
}

gulp.task('lightmodule', lightmoduleTask)
module.exports = lightmoduleTask
