const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      webpackStream = require('webpack-stream'),
      webpack = require('webpack')

gulp.task('sass', () =>
  gulp.src('./src/styles/global.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./app'))
)

gulp.task('webpack', () =>
  gulp.src('./src/js/app.jsx')
      .pipe(webpackStream(require('./webpack.config.js'), webpack))
      .pipe(gulp.dest('./app'))
)

gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.js*', ['webpack'])
  gulp.watch('./src/styles/**.scss', ['sass'])
})

gulp.task('dev',['sass','webpack','watch'])
