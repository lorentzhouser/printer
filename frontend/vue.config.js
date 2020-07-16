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
  }
};