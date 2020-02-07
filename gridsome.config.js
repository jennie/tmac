const postcssNested = require("postcss-nested");
const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const postcssPlugins = [tailwind(), postcssNested];
require("dotenv").config();

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

module.exports = {
  siteName: "Toronto Media Arts Centre",
  siteDescription: "Toronto Media Arts Centre",
  siteUrl: "https://tomediaarts.netlify.com",
  templates: {
    Exhibition: "/exhibitions/:slug",
    Event: "/events/:slug"
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins
      }
    }
  }
};
