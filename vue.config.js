// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  publicPath: './', // 设置打包文件相对路径
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css)(\?.*)?$/i,//需要压缩的文件正则
        threshold: 10240,
        deleteOriginalAssets: false, //压缩后保留原文件
        minRatio: 0.8
      })
    ],
    externals:{//排除一些引入的模块，不进行打包
      'vue':'Vue',
      'vue-router': 'VueRouter',
      'axios':'axios',
      'element-ui': 'ELEMENT'
    }
  },
  devServer: {
    port: 80,
    open: true, // 配置自动启动浏览器
    proxy: {
      '/wills': {
        target: 'http://39.107.13.154:8099/', // 后台springboot接口地址 target: 'http://39.107.13.154:8099/' 'http://127.0.0.1:8099/'
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/wills': ''
        }
      },
      '/qiniu': {
        target: 'http://up.qiniup.com', // 七牛云上传文件接口地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/qiniu': ''
        }
      }
    }
  }
}
