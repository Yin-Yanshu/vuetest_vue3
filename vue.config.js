const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // !!!!!!!!!!!!!! 修改完代理服务器配置后要重新npm run serve  否则无法代理请求 !!!!!!!!!!!!!!!!!!
    // 服务器会将未匹配到静态资源的请求转到target地址上
    proxy: {
      '/profilephotos': {
        target: 'http://localhost:3000',
        // 开启代理服务进行请求转发
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: 'http://localhost:3000',
        // 开启代理服务进行请求转发
        changeOrigin: true,
        secure: false,
      },
      '/user/book': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
