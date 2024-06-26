module.exports = (phase, {defaultConfig}) => {
  if ('sassOptions' in defaultConfig) {
      defaultConfig['sassOptions'] = {
          includePaths: ['./src'],
          prependData: `@import "~@/app/variables.module.scss"; 
                        @import "~@/styles/mixins.scss";`,
      }
  }
  defaultConfig['images'] = {
    unoptimized: true,
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [320, 420, 768, 1024, 1200],
  }
  defaultConfig['output'] = 'standalone'
  return defaultConfig;
}