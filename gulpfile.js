var gulp = require("gulp");
gulp.task("install", function() {
  var install = require("gulp-install");
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

gulp.task('serve', ['nomnoml', 'webpack'], function() {

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

gulp.task("nomnoml", function() {
  var fs = require('fs');
  var jison = require('jison');

  var nomnomlParser = new jison.Parser(fs.readFileSync('nomnoml/nomnoml.jison', { encoding: 'utf8' }));
  fs.writeFileSync('nomnoml/nomnoml.jison.js', nomnomlParser.generate({moduleName: 'nomnomlCoreParser'}));

  var nomnomlFiles = [
      'lib/dagre.min.js',
      'nomnoml/nomnoml.jison.js',
      'nomnoml/nomnoml.parser.js',
      'nomnoml/nomnoml.layouter.js',
      'nomnoml/nomnoml.renderer.js',
      'nomnoml/nomnoml.js'
  ];

  function concat(files){
      return files.map(function (filename){
          return fs.readFileSync(filename, { encoding: 'utf8' })
      }).join(';\n')
  }

  function replace(source, token, replacement){
      return source.split(token).join(replacement)
  }

  var wrapper = fs.readFileSync('bundleWrapper.js', { encoding: 'utf8' })
  var bundle = replace(wrapper, '/*{{body}}*/', concat(nomnomlFiles))

  fs.writeFileSync('dist/nomnoml.js', bundle)
});

