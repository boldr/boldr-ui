module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    require('autoprefixer')({
      browsers: ['> .5% in US', 'last 1 versions'],
    }),
  ],
});
