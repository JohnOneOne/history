var gulp=require('gulp');
var fs=require('fs');
var connect=require('gulp-connect');
var respond=require('gulp-respond');
var sass=require('gulp-sass');
var watch=require('gulp-watch');
var minifyCss=require('gulp-minify-css');
var concat=require('gulp-concat');
var rev=require('gulp-rev');
var ngAnnotate=require('gulp-ng-annotate');
var ngMin=require('gulp-ngmin');
var uglify=require('gulp-uglify');
var revCollector=require('gulp-rev-collector');
var clean=require('gulp-clean');
var rename=require('gulp-rename');
var minifyHtml=require('gulp-minify-html');
//编译sass
gulp.task('sassfile',function(){
    return gulp.src('elephant/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest( 'elephant/css/' ));
});

//压缩css
/*gulp.task('miniCss',function(){
	gulp.src('elephant/css/*.css')
		.pipe(minifyCss())
		.pipe(concat('all.min.css'))
		.pipe(rev())
		.pipe(gulp.dest('./elephant/css/build/'))
		.pipe(rev.manifest('miniCss.json'))
		.pipe(gulp.dest('./elephant/json'))
})*/
//清除
gulp.task('clean',function(){
	return gulp.src(['./elephant/js/build/'])
				.pipe(clean())
})
//压缩js
gulp.task('miniJs',['clean','sassfile'],function(){
	return gulp.src(['elephant/js/app.js','elephant/js/config.js','elephant/js/controller.js','elephant/js/directive.js','elephant/js/base.js','elephant/js/api.service.js'])
				.pipe(ngAnnotate())
				.pipe(ngMin())
				.pipe(uglify())
				.pipe(concat('all.min.js'))
				.pipe(rev())
				.pipe(gulp.dest('./elephant/js/build/'))
				.pipe(rev.manifest('miniJs.json'))
				.pipe(gulp.dest('./elephant/json/'))
})

//压缩html
gulp.task('minifyHtml',['miniJs'],function(){
	return gulp.src('./elephant/index.html')
		.pipe(minifyHtml())
		.pipe(rename(function(path){
			path.basename='build';
		}))
		.pipe(gulp.dest('./elephant/'))
})
//执行替换
gulp.task('rev',['minifyHtml'],function(){
	return gulp.src(['./elephant/index.html','./elephant/json/miniJs.json'])
		.pipe(revCollector())
		.pipe(gulp.dest('./elephant/'))
})
//监听
gulp.task('watch',['rev'],function(){
	gulp.watch(['elephant/css/*.scss','elephant/index.html'],['rev'])
})
gulp.task('connect',['watch'],function(){
	connect.server({
		root:['elephant','bower_components'],
		port:8016,
		livereload:true,
		middleware:function(){
			return [function(req,res,next){
				next();
			},function(req,res){
				var path=req.url.split('?').shift();
				path=path=='/'?'/index.html':path;
				url='elephant'+path;
				if(!fs.existsSync(url)){
					url='node_modules'+path;
				}
				gulp.src(url)
					.pipe(respond(res));
			}]
		}
	})
})
gulp.task('serve',['connect'])