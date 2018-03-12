module.exports = {
    "default" : {
        "deps" : [ "watch" ]
    },
    "js" : {
        "src" : [ "src/js/**/*.js" ],
        "dest" : "dist/js"
    },
    "sass" : {
        "src" : [ "src/sass/**/*.scss" ],
        "dest" : "dist/css"
    },
    "sprite" : {
        "src" : [ "res/sprite/*.png" ],
        "dest" : "dist/sprite"
    },
    "concat" : {
        "deps" : [
                "compile-js",
                "compile-sass"
        ],
        "js" : [
                "dist/js/**/!(index).js", 
                "dist/js/index.js"
        ],
        "jsName" : "concat.js",
        "css" : [
                "dist/css/*.css"
        ],
        "cssName" : "style.css",
        "dest" : "dist/latest"
    },
    "minify" : {
        "deps" : [
                "concat"
        ],
        "dest" : "dist/latest"
    },
    "watch" : {
        "deps" : [
                "minify"
        ],
        "src" : [
                "src/js/**/*.js",
                "src/sass/**/*.scss"
        ],
        "tasks" : [
                "minify"
        ]
    },
    "start" : {
        "deps" : [
            "browser-sync",
            "watch"
        ]
    }
}