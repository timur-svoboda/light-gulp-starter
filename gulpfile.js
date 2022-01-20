import gulp from "gulp";
const { src, dest, parallel } = gulp;

import BrowserSync from "browser-sync";
const bs = BrowserSync.create();

import colors from "colors/safe.js";
import sourcemaps from "gulp-sourcemaps";

import postcss from "gulp-postcss";
import cssnano from "cssnano";

const config = {
  paths: {
    server: "./src",
    pages: {
      src: "./src/*.html",
      dest: "./dist"
    },
    css: {
      src: "./src/css/**/*.css",
      dest: "./dist/css"
    }
  }
};

export function dev(cb) {
  bs.init({
    server: config.paths.server
  });

  bs.watch(config.paths.server).on("change", path => {
    console.log(`File ${colors.green(path)} has been changed`);
    bs.reload();
  });

  cb();
}

export default dev;

function buildPages() {
  return src(config.paths.pages.src)
    .pipe(dest(config.paths.pages.dest));
}

function buildCss() {
  return (src(config.paths.css.src))
    .pipe(sourcemaps.init())
    .pipe(postcss([cssnano()]))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(config.paths.css.dest));
}

export const build = parallel(buildPages, buildCss);