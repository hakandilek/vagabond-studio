var gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

var webpack = require('webpack-stream');

gulp.task('serve', ['webpack'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("index.html").on("change", reload);
    gulp.watch("js/*.js").on("change", reload);
    gulp.watch("codemirror/*").on("change", reload);
    gulp.watch("nomnoml/*").on("change", reload);
    gulp.watch("css/*.css").on("change", reload);
});

gulp.task('default', function() {
    gulp.start('serve');
});

gulp.task("webpack", function() {
return gulp.src('src/main.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('dist/'));
});
