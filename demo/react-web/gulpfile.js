
var gulp = require('gulp');

/**
 * gulp build browserify and babel 
 */


var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

gulp.task('js:browserify',function(){
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

// gulp.task('default',['js:browserify']);

/**
 * gulp build webpack and babel
 */

var gutil = require('gulp-util'); 
var webpack = require('webpack');

gulp.task('js:webpack',function(callback){
    webpack({
        // configuration
        entry:[
            './src/main.js'
        ],
        output:{
            path:'./js/',
            publicPath:'./',
            filename:'bundle.js'
        },
        module:{
            loaders:[
                {
                    test:/\.js$/,
                    exclude:'./node_modules/',
                    loader:'babel',
                    query:{
                        presets:['react','es2015']
                    }
                }
            ]
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('default',['js:webpack']);


/**
 *  JSX语法检查
 */

var eslint = require('gulp-eslint');

gulp.task('jsx',function(){
    return gulp.src('./src/*.js')
        .pipe(eslint({
            plugins: [
                'react'
            ],
            parser: 'babel-eslint',
            ecmaFeatures: {
                'jsx': true
            },
            rules:{
                'semi':2
            },
            env:{
                'es6':true
            }
        }))
        .pipe(eslint.format())
});