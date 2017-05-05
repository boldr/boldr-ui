const baseConfig = require('../internal/webpack/webpack.dev.config')

module.exports = storybookBaseConfig =>
  Object.assign({}, storybookBaseConfig, {
    entry: Object.assign({}, storybookBaseConfig.entry, {
      preview: storybookBaseConfig.entry.preview,
    }),
    resolve: {
      modulesDirectories: baseConfig.resolve.modules,
    },
    module: Object.assign({}, storybookBaseConfig.module, {
      loaders: storybookBaseConfig.module.loaders.concat(baseConfig.module.rules),
    }),
  })
