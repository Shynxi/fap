var config      = require('../config')
if(!config.tasks.bower) return

var mainBowerFiles = require('main-bower-files');
var gulp  = require('gulp')

var bowerFilesTask = function() {
    return gulp.src(mainBowerFiles(), { base: 'bower_components' })
        .pipe(gulp.dest(config.tasks.bower.dest))
};
gulp.task('bowerFiles', bowerFilesTask);
module.exports = bowerFilesTask