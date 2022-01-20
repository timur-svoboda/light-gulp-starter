import gulp from "gulp";
import BrowserSync from "browser-sync";
const bs = BrowserSync.create();
import colors from "colors/safe.js";

const config = {
  paths: {
    server: "./src"
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