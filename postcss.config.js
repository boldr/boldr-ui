const postcssCssnext = require("postcss-cssnext");
const postcssReporter = require("postcss-reporter");

module.exports = {
  plugins: [
    postcssCssnext({
      overflowWrap: true,
      rem: false,
      colorRgba: false,
      autoprefixer: {
        browsers: ["> 1%", "last 2 versions"],
      },
    }),
    postcssReporter({ clearMessages: true }),
  ],
};
