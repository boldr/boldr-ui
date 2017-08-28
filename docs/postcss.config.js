module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: ['> 1%', 'last 2 versions'],
      flexbox: 'no-2009',
    }),
  ],
});
