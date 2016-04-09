var gulp = require("gulp");
gulp.task("install", function() {
  var install = require("gulp-install");
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

gulp.task('serve', ['webpack'], function() {

  var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

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
  var webpack = require('webpack-stream');

  return gulp.src('src/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

