import gulp from "gulp";
const { src, dest, parallel } = gulp;

import BrowserSync from "browser-sync";
const bs = BrowserSync.create();

import colors from "colors/safe.js";
import sourcemaps from "gulp-sourcemaps";

import postcss from "gulp-postcss";
import cssnano from "cssnano";

import uglify from "gulp-uglify";

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
    },
    js: {
      src: "./src/js/**/*.js",
      dest: "./dist/js"
    },
    images: {
      src: "./src/images/**/*",
      dest: "./dist/images"
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
  return src(config.paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([cssnano()]))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(config.paths.css.dest));
}

function buildJs() {
  return src(config.paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(dest(config.paths.js.dest));
}

function buildImages() {
  return src(config.paths.images.src)
    .pipe(dest(config.paths.images.dest));
}

export const build = parallel(buildPages, buildCss, buildJs, buildImages);