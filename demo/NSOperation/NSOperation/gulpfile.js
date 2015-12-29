/**
 * @time 2015年10月3日
 * @author icepy
 * @info 实现对app类型的编译打包
 */


/**
 * 	gulp build:app github  build:[编译类型] [编译的目标目录]
 */



var os = require('os');
var crypto = require('crypto');
var buffer = require('buffer');
var fs = require('fs');
var gulp = require('gulp');
var clean = require('gulp-clean');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var importCss = require('gulp-import-css');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var filter = require('gulp-filter');
var amdOptimize = require('amd-optimize');
var gutil = require('gulp-util');
var size = require('gulp-size');
var gulpif = require('gulp-if');
var pkg = require('./package.json');
var header = require('gulp-header');

var args = process.argv,
	taskDir,
	taskPath,
	stateTag,
	outPath;

if (args.length) {
	var rgs = args.slice(2);
	console.log(rgs);
	if (rgs.length) {
		var task = rgs[0];
		var moduleTask = rgs[1].split(':');
		taskDir = moduleTask[0];
		stateTag = moduleTask[1];
		taskPath = './'+taskDir+'/';
		outPath = './zip/'+taskDir+'/';
		if (task.split(':')[1] === 'app') {
			gulp.task(task);
			gulp.task(rgs[1],['over-clean'],function(e){
				gutil.log('task overflow');
				var md5 = crypto.createHash('md5');
				var date = new Date();
			    md5.update('' + date.getTime() + (Math.random(100) * 100));
			    var buf = new Buffer(md5.digest('hex'));
			    var key = buf.toString('utf8');

			    var times = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getMinutes()+'-'+date.getSeconds()+'-'+key+'/';
			    var zipFolder = fs.existsSync('./zip');
			    if (!zipFolder) {
			    	gutil.log('mkdir zip ---> '+'./zip');
			    	fs.mkdirSync('./zip');
			    };
			    var folder = fs.existsSync(outPath);
			    if (!folder) {
			    	gutil.log('mkdir --- > '+outPath);
			    	fs.mkdirSync(outPath);
			    };
			    var targetFolder = fs.existsSync(outPath+times);
			    if (!targetFolder) {
			    	gutil.log('mkdir target --- >'+outPath+times);
			    	fs.mkdirSync(outPath+times);
			    };
			    var outTime = date.getFullYear()+'年 '+(date.getMonth()+1)+'月 '+date.getDate()+'日 '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			    var osType = {
			    	'linux':'Linux',
			    	'darwin':'OS X',
			    	'windows_NT':'Windows'
			    };
			    var outFileContent = '\r\nMD5:'+key;
			    	outFileContent += '\r\nAPPNAME:'+taskDir;
			    	outFileContent += '\r\nTIME:'+outTime;
			    	outFileContent += '\r\nOS:'+osType[os.platform().trim().toLowerCase()];

			    var isSuccess = fs.writeFileSync(outPath+times+'buildMD5', outFileContent);
			    if (isSuccess) {
			        throw isSuccess;
			    }
			    return gulp.src(taskPath+'dist/**')
			        .pipe(zip(taskDir+'-'+key + '.zip'))
			        .pipe(gulp.dest(outPath+times));
			});
		};		
	}else{
		gutil.log('enter build:type target dir');
	};
};

gulp.task('clean',function(){
	gutil.log('clean --- dir ---./'+taskDir+'dist/**');
	return gulp.src([taskPath+'dist/*'],{
		read:false
	}).pipe(clean());
});

gulp.task('structure-style',['structure-javascript'],function(){
	return gulp.src(taskPath+'css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(importCss())
		.pipe(concat('style.css'))
		.pipe(size({showFiles: true, title: 'source'}))
		.pipe(minifycss())
		.pipe(notify({
			message:'css style task complete'
		}))
		.pipe(gulp.dest(taskPath+'dist/css'))
		.pipe(size({showFiles: true, title: 'minified'}))
    	.pipe(size({showFiles: true, gzip: true, title: 'gzipped'}));
});

var LHM_DEP_BUNDLE = '../bundle/dep/';
var LHM_SRC_BUNDLE = '../bundle/src/';

gulp.task('structure-javascript',['structure-move'],function(){
	gutil.log('build javascript --- >'+taskPath+'js/*');
	var amd = fs.existsSync(taskPath+'amd.json');
	if (amd) {
		gutil.log('i can reading amd.json --- >'+taskPath+'amd.json');
		var amdJSON = require(taskPath+'amd');
		var amdConfig = {};
		amdConfig.paths = {};
		for(var depK in amdJSON.dep){
			gutil.log('build module --- >' +LHM_DEP_BUNDLE+amdJSON.dep[depK])
			amdConfig.paths[depK] = LHM_DEP_BUNDLE+amdJSON.dep[depK];
			// amdJSON.dep[depK] = LHM_DEP_BUNDLE+amdJSON.dep[depK];
		}
		for(var srcK in amdJSON.src){
			gutil.log('build module --- >' +LHM_SRC_BUNDLE+amdJSON.src[srcK])
			amdConfig.paths[srcK] = LHM_SRC_BUNDLE+amdJSON.src[srcK];
			// amdJSON.src[srcK] = LHM_SRC_BUNDLE+amdJSON.src[srcK];
		}
		for(var jsK in amdJSON.js){
			amdConfig.paths[jsK] = amdJSON.js[jsK];
			// amdJSON.js[jsK] = taskPath+amdJSON.js[jsK];
		}
		if (amdJSON.shim) {
			amdConfig.shim = amdJSON.shim;
		};
		amdConfig.baseUrl = taskPath;
		gutil.log('init file main.js --- > '+taskPath+'main.js');
		return gulp.src(taskPath+'main.js')
			.pipe(amdOptimize('./main',amdConfig))
			.pipe(concat('main.js'))
			.pipe(size({showFiles: true, title: 'source'}))
			.pipe(uglify())
			.pipe(gulp.dest(taskPath+'dist'))
			.pipe(size({showFiles: true, title: 'minified'}))
    		.pipe(size({showFiles: true, gzip: true, title: 'gzipped'}));
	}else{
		gutil.log('can\'t reading amd.json');
	};
});

gulp.task('structure-move',['clean'],function(){
	return gulp.src([
			'!'+taskPath+'main.js',
			'!'+taskPath+'amd.json',
			taskPath+'*.*',
			'!'+taskPath+'js/model/**',
			'!'+taskPath+'js/view/**',
			'!'+taskPath+'dist/**',
			'!'+taskPath+'static/**',
			taskPath+'**'
		])
		.pipe(gulp.dest(taskPath+'dist'));
});

gulp.task('over-clean',['path-replace'],function(){
	return gulp.src([
		taskPath+'dist/js/model',
		taskPath+'/dist/js/view',
		taskPath+'dist/dist',
		taskPath+'dist/js/*.*',
		taskPath+'dist/static',
		taskPath+'dist/main.js',
		taskPath+'dist/link/bundle.js',
		taskPath+'dist/link/amazeui.js',
		taskPath+'dist/mock',
		taskPath+'dist/css/*.*',
		'!'+taskPath+'dist/css/style-*.*'
	],{
		read:false
	}).pipe(clean());
});

gulp.task('path-replace',['structure-style'],function(){

	var jsFilter = filter(taskPath+'dist/main.js', {
        restore: true
    });

	var bundleFilter = filter(taskPath+'dist/link/bundle.js',{
		restore: true
	});

	var uiFilter = filter(taskPath+'dist/link/amazeui.js',{
		restore: true
	});

    var cssFilter = filter(taskPath+'dist/css/style.css', {
        restore: true
    });
    var userefAssets = useref.assets();
    var date = new Date();
	var times = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'   '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	var banner = [
		'/**',
  		' * <%= pkg.name %> - module name <%= project.dir %>',
  		' * @description you must be fetch module name to run webview containenr',
  		' * @version v<%= pkg.version %>',
  		' * @time '+ times,
  		' * @author <%= pkg.author %>',
  		' * @copy <%= pkg.homepage %>',
  		' */',
  		''
  	].join('\n');
  	var project ={
  		"dir":taskDir
  	};
  	if (stateTag && stateTag === 'debug') {
		console.log('stateTag --- > '+stateTag);	
	};
    return gulp.src(taskPath+'dist/index.html')
    	.pipe(userefAssets)
        .pipe(jsFilter)
        .pipe(jsFilter.restore)
        .pipe(bundleFilter)
        .pipe(bundleFilter.restore)
        .pipe(uiFilter)
        .pipe(uiFilter.restore)
        .pipe(cssFilter)
        .pipe(cssFilter.restore)
        .pipe(rev())
        .pipe(userefAssets.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulpif('*.js',uglify()))
        .pipe(gulpif('*.js',header(banner,{pkg:pkg,project:project})))
        .pipe(gulp.dest(taskPath+'dist/'));
});