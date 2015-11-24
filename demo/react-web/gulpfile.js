var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

gulp.task('default',function(){
    browserify('./src/main.js')
    .transform(babelify,{
        presets: ['es2015', 'react']
    })
    .bundle()
    .on("error",function(err){ 
        console.log("Error: " + err.message); 
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./js'));
});