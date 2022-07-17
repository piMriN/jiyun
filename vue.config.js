const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: false,
    host: 'localhost',
    port: 8888,
    https: false,
    proxy: {
      //配置跨域
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL, //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '' //请求的时候使用这个api就可以
        }
      }
    }
  }
})
