var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var connect = require('gulp-connect');
var replace = require('gulp-html-replace');
var includer = require('gulp-htmlincluder');
var livereload = require('gulp-livereload');

gulp.task('server',function(){
  connect.server({
    root: 'build',
    livereload: true
    });
  });
gulp.task('css',function(){
  gulp.src('dev/css/*.css')
  .pipe(concatCss('style.css'))
  .pipe(gulp.dest('build/css/'))
  .pipe(connect.reload());
  });

gulp.task('html',function(){
  gulp.src('dev/*.html')
  .pipe(includer())
  .pipe(replace({
    css: 'css/style.css'
    }))
  .pipe(gulp.dest('build/'))
  .pipe(connect.reload());
  });

gulp.task('javascript',function(){
  gulp.src('dev/javascript/*.js')
  .pipe(gulp.dest('build/javascript/'))
  .pipe(connect.reload());
  });
gulp.task('img',function(){
  gulp.src('dev/img/icons/*.png')
  .pipe(gulp.dest('build/img/icons/'))
  .pipe(connect.reload());
  });

gulp.task('default',function(){
  gulp.start('css','html','javascript','img','server');

  gulp.watch(['dev/*.html'],function(){
    gulp.start('html');
    });
  gulp.watch(['dev/css/**/*.css'],function(){
    gulp.start('css');
    });
   gulp.watch(['dev/javascript/*.js'],function(){
    gulp.start('javascript');
    });
   gulp.watch(['dev/img/icons/*.png'],function(){
    gulp.start('img');
    });
  });













