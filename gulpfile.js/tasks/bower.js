var config      = require('../config')
if(!config.tasks.bower) return

var bower = require('gulp-bower')
var gulp  = require('gulp')

var bowerTask = function() {
    return bower({ directory: config.tasks.bower.src })
};
gulp.task('bower', bowerTask);
module.exports = bowerTask