let preprocessor  = 'scss';
let source_folder = 'app';

const {src, dest, parallel, series, watch} = require('gulp');
const browserSync   = require('browser-sync').create();
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const scss          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const cleancss      = require('gulp-clean-css');
const imagemin      = require('gulp-imagemin');
const newer         = require('gulp-newer');
const del           = require('del');
const ttf2woff      = require('gulp-ttf2woff');
const ttf2woff2     = require('gulp-ttf2woff2');
const fs            = require('fs');


function browsersync() {
    browserSync.init({
        server: {baseDir: 'app/'},
        notify: false,
        online: true
    })
}

function scripts() {
    return src('app/js/app.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
    return src('app/' + preprocessor + '/main.' + preprocessor + '')
    .pipe(eval(preprocessor)())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'], grid: true } ))
    .pipe(cleancss(( { level: { 1: { specialComments: 0 } }/*, format: 'beautify'*/ })))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function images() {
    return src('app/img/src/**/*')
    .pipe(newer('app/img/dest/'))
    .pipe(imagemin())
    .pipe(dest('app/img/dest/'))
}

function fonts() {
    src('app/fonts/**/*')
    .pipe(ttf2woff())
    .pipe(dest('app/fonts/'));
    return src('app/fonts/**/*')
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts/'));
}

function cleanimg() {
    return del('app/img/dest/**/*', { force: true })
}

function cleandist() {
    return del('dist/**/*', { force: true })
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/**/*.html',
        ], { base: 'app'} )
    .pipe(dest('dist'))
}

/*function fontsStyle(params) {
let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
 if (file_content == '') { 
    fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
    return fs.readdir('app/fonts/', function (err, items) { 
    if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) { 
            let fontname = items[i].split('.');
            fontname = fontname[0];
            if (c_fontname != fontname) { 
                fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                } 
                c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

} */

function startwatch() {
   watch('app/**/' + preprocessor + '/**/*', styles);
   watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
   watch('app/**/*.html').on('change', browserSync.reload);
   watch('app/img/src/**/*', images);
}


//exports.fontsStyle  = fontsStyle;
exports.fonts       = fonts;
exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.build       = series(cleandist, fonts, styles, scripts, images, buildcopy, fontsStyle)

exports.default     = parallel(fonts, styles, scripts, browsersync, startwatch);