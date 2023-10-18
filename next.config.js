// const nextSafe = require('next-safe')

module.exports = (phase, {defaultConfig}) => {
  if ('sassOptions' in defaultConfig) {
      defaultConfig['sassOptions'] = {
          includePaths: ['./src'],
          prependData: `@import "~@/app/variables.module.scss"; 
                        @import "~@/styles/mixins.scss";`,
      }
  }
  defaultConfig['experimental'] = {
    serverActions: true
  }
  // defaultConfig['headers'] = async () => {
	// 	return [
	// 		{
	// 			source: '/login',
	// 			headers: nextSafe({
  //         isDev: true
  //       }),
	// 		},
	// 	]
	// }
  return defaultConfig;
}