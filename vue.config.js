const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/admin/",
  publicPath: "./",
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "VbenAdmin";
      return args;
    });
  },
});
