import fileinclude from "gulp-file-include";

gulp.task("html", function (callback) {
  return gulp
    .src("./app/html/*.html")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "html syntax error",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(
      fileinclude({
        prefix: "@@",
      })
    )
    .pipe(gulp.dest("./app/"));

  callback();
});
