// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/Make-Your-Burger/'
//     : '/'
// }


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
