import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index.js'
// 引入解析markdown为html的插件
import MarkDownIt from 'markdown-it'
// 引入响应式elementui的css文件
import 'element-ui/lib/theme-chalk/display.css'
// 引入elementui 主题样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 引入mavon-editor
import MavonEditor from 'mavon-editor'
// 引入mavon-editor的css
import 'mavon-editor/dist/css/index.css'
// 引入全局样式
import './style/global.css'
// 引入字体图表文件
import './iconfont/iconfont.css'
// 引入font-awesome的css
import 'font-awesome/css/font-awesome.css'
// 响应进度条的JS CSS
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import './plugins/element.js'
import * as qiniu from 'qiniu-js'
// 高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css' // mono-blue
// 引入通用server
import * as server from './api/server.js'
// import qiniu from 'qiniu'
// axios.defaults.baseURL = '/wills' // 因为涉及到七牛云上传图片，所以暂时中止默认/wills的操作，改为手动执行
Vue.use(MavonEditor)
// axios 的拦截器 在请求以前
const excute = ['/wills/system/cpu', '/wills/system/memory', '/wills/system/disk', '/wills/system/hardware']
axios.interceptors.request.use(function (config) {
  // 添加token请求头第一步:
  // 获取localStorage中的token
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.common.token = token
  }
  if (!excute.includes(config.url)) {
    nProgress.start()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 设置axios 全局超时时间
axios.defaults.timeout = 5000
axios.defaults.retry = 3
axios.defaults.retryDelay = 3000
// axios 的拦截器 在请求以后
axios.interceptors.response.use(function (response) {
  if (!excute.includes(response.config.url)) {
    nProgress.done()
  }
  // console.log(response.data.statusCode)
  const code = response.data.statusCode
  if (code === 477) {
    // 跳转到登录页面
    window.location.href = '/#/login'
  } else if (code === 488) {
    // 跳转到没有权限的页面
    window.location.href = '/not_permit'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

Vue.config.productionTip = false
// this.$mark.render 使用这个去把生成的md语法转换为html
var md = new MarkDownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return '' // 使用额外的默认转义
  }
})

Vue.prototype.$mark = md
Vue.prototype.$http = axios
Vue.prototype.qiniu = qiniu
Vue.prototype.nProgress = nProgress
Vue.prototype.server = server
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
