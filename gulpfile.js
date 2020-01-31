var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
  gulp.watch("src/lib/*.ts", gulp.series("build"));
});
