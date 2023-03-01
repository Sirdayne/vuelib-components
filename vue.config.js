module.exports = {
  transpileDependencies: ["vuex-module-decorators"],

  chainWebpack: (config) => {
    // npm install --save-dev svg-url-loader
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .use("svg-url-loader")
      .loader("svg-url-loader");
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_mixins.sass"`,
      },
    },
  },

  pages: {
    index: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
      title: process.env.VUE_APP_TITLE,
    },
  },
};
