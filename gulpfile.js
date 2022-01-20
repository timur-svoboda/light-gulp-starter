import gulp from "gulp";
const { src, dest, parallel } = gulp;

import BrowserSync from "browser-sync";
const bs = BrowserSync.create();

import colors from "colors/safe.js";

const config = {
  paths: {
    server: "./src",
    pages: {
      src: "./src/*.html",
      dest: "./dist"
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

export const build = parallel(buildPages);