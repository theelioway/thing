const { src, dest, watch, series } = require("gulp")
const prettier = require("gulp-prettier"),
  del = require("del"),
  vinylPaths = require("vinyl-paths")

let prettyUglyFiles = ["./pretty/ugly/*.*"]

let prettyUglyTask = () => {
  return src(prettyUglyFiles)
    .pipe(vinylPaths(del))
    .pipe(prettier())
    .pipe(dest("./pretty/"))
}

let watchTask = () => {
  return watch(prettyUglyFiles, prettyUglyTask)
}


exports.prettyUgly = watchTask
exports.default = prettyUglyTask
