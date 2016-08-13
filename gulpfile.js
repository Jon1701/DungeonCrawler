////////////////////////////////////////////////////////////////////////////////
// Modules
////////////////////////////////////////////////////////////////////////////////
var gulp = require('gulp'); // Gulp.
var webserver = require('gulp-webserver'); // Gulp webserver.
var sass = require('gulp-sass'); // SASS.
var webpack = require('webpack-stream'); // Webpack.

////////////////////////////////////////////////////////////////////////////////
// Paths
////////////////////////////////////////////////////////////////////////////////
var srcPath = './source/';
var destPath = './build/';
var modulesPath = './node_modules/';

// JSX
gulp.task('jsx', function() {
  gulp.src(srcPath + 'javascript/index.jsx')
    .pipe(webpack({
      watch: true,
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(gulp.dest(destPath + 'javascript/'));
});

// Compile .scss and move.
gulp.task('stylesheets', function() {
  gulp.src(srcPath + 'stylesheets/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destPath + 'stylesheets/'));
});

// Move .html.
gulp.task('html', function() {
  gulp.src(srcPath + '*.html')
    .pipe(gulp.dest(destPath));
});

////////////////////////////////////////////////////////////////////////////////
// Webserver
////////////////////////////////////////////////////////////////////////////////
gulp.task("webserver", function() {
  gulp.src(destPath)
    .pipe(webserver({
      fallback: "index.html",
      livereload: true,
      directoryListing: false,
      open: false
    }));
});

////////////////////////////////////////////////////////////////////////////////
// Watch task
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch(srcPath + 'javascript/**/*.jsx', ['jsx']); // JSX files.
  gulp.watch(srcPath + 'stylesheets/**/*.scss', ['stylesheets']); // SASS Main.
  gulp.watch(srcPath + 'stylesheets/**/_*.scss', ['stylesheets']); // SASS Partials.
  gulp.watch(srcPath + '*.html', ['html']);
});

////////////////////////////////////////////////////////////////////////////////
// Default task
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['webserver', 'watch', 'jsx', 'stylesheets', 'html']);
