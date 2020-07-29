const WorkerPlugin = require('worker-plugin')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/base/_variables.scss";
          @import "@/assets/css/base/_css-reset.scss";
          @import "@/assets/css/base/_global.scss";
          @import "@/assets/css/base/_mixins.scss";
          @import "@/assets/css/base/_typography.scss";
        `
      }
    }
  },
  configureWebpack: {
    output: {
      globalObject: "this"
    },
    plugins: [
      new WorkerPlugin()
    ]
  },
  devServer: {
    proxy: 'http://localhost:1337'
  }
};





// build: {
//   extend(config, { isDev, isClient }) {
//     config.module.rules.push({
//       test: /\.worker\.js$/,
//       use: { loader: "worker-loader" }
//     });
//   }
// }
