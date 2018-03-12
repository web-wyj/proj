/*
 * var gulp = require( "gulp" );
 * ********************************
 * npm install gulp-cli -g
 * npm init
 * npm install gulp --save-dev
 * 
 * var babel = require( "gulp-babel" );
 * ********************************
 * npm install gulp-babel --save-dev
 * npm install babel-preset-es2015 --save-dev
 *
 * var sass = require( "gulp-sass" );
 * ********************************
 * npm install gulp-sass --save-dev
 *
 * var spritesmith = require( "gulp.spritesmith" );
 * ********************************
 * npm install gulp.spritesmith --save-dev
 *
 * var eslint  = require( "gulp-eslint" );
 * ********************************
 * npm install eslint -g
 * eslint --init
 * 向导初始化：popular style guide --> standard --> javascript
 * npm install gulp-eslint --save-dev
 *
 * var sasslint  = require( "gulp-sasslint" );
 * ********************************
 * npm install sasslint gulp-sass-lint --save-dev
 *
 * var concat  = require( "gulp-concat" );
 * ********************************
 * npm install gulp-concat --save-dev
 *
 * var uglify  = require( "gulp-uglify" );
 * ********************************
 * npm install gulp-uglify --save-dev
 *
 * var cssMiinify  = require( "gulp-cleam-css" );
 * ********************************
 * npm install gulp-clean-css --save-dev
 *
 * var rename  = require( "gulp-rename" );
 * ********************************
 * npm install gulp-rename --save-dev
 *
 * var browserSync = require( "browser-sync" );
 * ********************************
 * npm install browser-sync --save-dev
 *
 * cnpm install gulp-babel babel-preset-es2015 gulp-sass gulp-concat gulp-uglify gulp-clean-css gulp-rename browser-sync --save-dev
 */

const config  = require( "./config.js" );
const babelrc = require( "./.babelrc" );
// const spriterc = require( "./.spriterc" );
// const eslintrc = require( "./.eslintrc");
// const browserSyncrc = require( "./.browserSyncrc");

var gulp    = require( "gulp" ),
    babel   = require( "gulp-babel" ),
    sass    = require( "gulp-sass" ),
    // spritesmith = require("gulp.spritesmith" ),
    // eslint  = require( "gulp-eslint" ),
    // sasslint  = require( "gulp-sasslint" ),
    concat  = require( "gulp-concat" ),
    uglify  = require( "gulp-uglify" ),
    cssMiinify = require( "gulp-clean-css" ),
    rename  = require( "gulp-rename" ),
    browserSync = require( "browser-sync" ),
    reload  = browserSync.reload;

gulp.task( "default", config.default.deps, function() {
    // TODO
} );

/*
 * babel es2015
 * es6 --> es5 预处理
 * uglify 不支持 es6
 */

gulp.task( "compile-js", function() {
    gulp.src( config.js.src )
        .pipe( babel( babelrc ) )
        .pipe( gulp.dest( config.js.dest ) );
} );

/*
 * sass
 * sass --> css 预处理
 */

gulp.task( "compile-sass", function() {
    gulp.src( config.sass.src )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( gulp.dest( config.sass.dest ) );
} );

/*
 * spritesmith
 * some pngs --> sprites.png 预处理
 */

gulp.task( "sprite", function() {
    gulp.src( config.sprite.src )
        .pipe( spritesmith( spriterc ) )
        .pipe( gulp.dest( config.sprite.dest ) );
} );

/*
 * eslint
 */

// gulp.task( "eslint", function() {
//     gulp.src( config.js.src )
//         .pipe( eslint( eslintrc ) )
//         .pipe( eslint.format() )
//         .pipe( eslint.failAfterError() );       // 代码检查失败时，终止 gulp 任务
// } );

/*
 * sasslint
 */

// gulp.task( "sasslint", function() {
//     gulp.src( config.sass.src )
//         .pipe( sasslint() )
//         .pipe( sasslint.format() )
//         .pipe( sasslint.failOnError() );        // 出错时，终止 gulp 任务
// } );

/*
 * concat
 */

gulp.task( "concat", config.concat.deps , function() {
    gulp.src( config.concat.js )
        .pipe( concat( config.concat.jsName ) )
        .pipe( gulp.dest( config.concat.dest ) );
    gulp.src( config.concat.css )
        .pipe( concat( config.concat.cssName ) )
        .pipe( gulp.dest( config.concat.dest ) );
} );

/*
 * uglify
 */

gulp.task( "minify", config.minify.deps, function() {
    gulp.src( config.concat.dest + "/" + config.concat.jsName )
        .pipe( uglify() )
        .pipe( rename( function( path ) {
            path.basename += ".min";
        } ) )
        .pipe( gulp.dest( config.minify.dest ));
    gulp.src( config.concat.dest + "/" + config.concat.cssName )
        .pipe( cssMiinify() )
        .pipe( rename( function( path ) {
            path.basename += ".min";
        } ) )
        .pipe( gulp.dest( config.minify.dest ))
        .pipe( reload( { stream : true } ) );
} );

/*
 * watch
 */

gulp.task( "watch", config.watch.deps, function() {
    gulp.watch( config.watch.src, config.watch.tasks );
} );

gulp.task( "browser-sync", function() {
    browserSync( browserSyncrc );
} );

gulp.task( "start", config.start.deps, function() {
    console.log( `server run in 127.0.0.1:${browserSyncrc.port}` );
} );