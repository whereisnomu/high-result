import gulp from "gulp";
import watch from "gulp-watch";

import browserSync from "browser-sync";

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";

import plumber from "gulp-plumber";
import notify from "gulp-notify";

import pug from "gulp-pug";

import { deleteAsync as del } from "del";

import csso from "gulp-csso";

import imagemin, { optipng, mozjpeg } from "gulp-imagemin";

const sass = gulpSass(dartSass);
browserSync.create();

gulp.task("pug", function (callback) {
  return gulp
    .src("./src/pug/pages/**/*.pug")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "pug syntax error",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(pug())
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());
  callback();
});

gulp.task("sass", function (callback) {
  return gulp
    .src("./src/styles/scss/**/*.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "style syntax error",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer("last 4 versions"))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css/"))
    .pipe(browserSync.stream());

  callback();
});

gulp.task("copy:img", function (callback) {
  return gulp
    .src("./src/img/**/*.*")
    .pipe(imagemin([optipng({ optimizationLevel: 5 })]))
    .pipe(gulp.dest("./build/img/"));
  callback();
});

gulp.task("copy:js", function (callback) {
  return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/"));
  callback();
});

gulp.task("copy:php", function (callback) {
  return gulp.src("./src/php/**/*.*").pipe(gulp.dest("./build/php/"));
  callback();
});

gulp.task("copy:docs", function (callback) {
  return gulp.src("./src/docs/**/*.*").pipe(gulp.dest("./build/docs/"));
  callback();
});

gulp.task("copy:fonts", function (callback) {
  return gulp.src("./src/fonts/**/*.*").pipe(gulp.dest("./build/fonts/"));
  callback();
});

gulp.task("clean:build", function (callback) {
  return del(["./build/"]);
  callback();
});

gulp.task("clean:img", function (callback) {
  return del(["./build/img/"]);
  callback();
});

gulp.task("watch", function () {
  watch(
    ["./src/img/**/*.*", "./src/js/**/*.js"],
    gulp.parallel(browserSync.reload)
  );

  watch("./src/styles/scss/**/*.scss", gulp.parallel("sass"));

  watch("./src/pug/**/*.pug", gulp.parallel("pug"));

  watch("./src/img/**/*.*", gulp.parallel("copy:img"));

  watch("./src/js/**/*.js", gulp.parallel("copy:js"));

  watch("./src/php/**/*.php", gulp.parallel("copy:php"));

  watch("./src/docs/**/*.*", gulp.parallel("copy:docs"));

  watch("./src/fonts/**/*.*", gulp.parallel("copy:fonts"));
});

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
  });
});

gulp.task(
  "default",
  gulp.series(
    "clean:build",
    gulp.parallel(
      "sass",
      "pug",
      "copy:img",
      "copy:js",
      "copy:php",
      "copy:docs",
      "copy:fonts"
    ),
    gulp.parallel("server", "watch")
  )
);
