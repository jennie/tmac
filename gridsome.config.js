const postcssNested = require("postcss-nested");
const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const postcssPlugins = [tailwind(), postcssNested];
require("dotenv").config();

module.exports = {
  cacheBusting: false,

  siteName: "Toronto Media Arts Centre",
  siteDescription: "Toronto Media Arts Centre",
  siteUrl: "https://tomediaarts.netlify.com",
  templates: {
    Exhibition: "/program/:slug",
    Event: "/event/:slug",
    Article: "/news/:slug"
  },
  chainWebpack: config => {
    config.mode("development");
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    config.module
      .rule("postcss")
      .oneOf("normal")
      .use("postcss-loader")
      .tap(options => {
        options.plugins.unshift(...[require("postcss-nested")]);
        return options;
      });
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins
      }
    }
  }
};
