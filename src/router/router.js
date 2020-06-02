import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 使用路由懒加载!
const routes = [
  {
    path: '/',
    name: 'Index',
    component: resolve => require(['@/views/Index.vue'], resolve),
    redirect: '/main',
    children: [
      {
        path: '/article',
        name: 'article',
        component: resolve => require(['@/views/Article.vue'], resolve)
      },
      {
        path: '/main',
        name: 'main',
        component: resolve => require(['@/components/foreground/main.vue'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/components/background/login.vue'], resolve)
  },
  {
    path: '/not_permit',
    name: 'not_permit',
    component: resolve => require(['@/components/public/not_permit.vue'], resolve)
  },
  {
    path: '/background',
    name: 'background',
    component: resolve => require(['@/components/background/back.vue'], resolve),
    redirect: '/base',
    children: [
      {
        path: '/base',
        name: 'base',
        component: resolve => require(['@/components/background/base.vue'], resolve)
      },
      {
        path: '/articleWrite',
        name: 'articleWrite',
        component: resolve => require(['@/components/background/article/articleWrite.vue'], resolve)
      },
      {
        path: '/articleManage',
        name: 'articleManage',
        component: resolve => require(['@/components/background/article/articleManage.vue'], resolve)
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: resolve => require(['@/components/background/system/userManage.vue'], resolve)
      },
      {
        path: '/roleManage',
        name: 'roleManage',
        component: resolve => require(['@/components/background/system/roleManage.vue'], resolve)
      },
      {
        path: '/authView',
        name: 'authView',
        component: resolve => require(['@/components/background/system/authView.vue'], resolve)
      },
      {
        path: '/fileManage',
        name: 'fileManage',
        component: resolve => require(['@/components/background/system/fileManage.vue'], resolve)
      },
      {
        path: '/websiteManage',
        name: 'websiteManage',
        component: resolve => require(['@/components/background/system/webInfo.vue'], resolve)
      },
      {
        path: '/log',
        name: 'log',
        component: resolve => require(['@/components/background/system/log.vue'], resolve)
      },
      {
        path: '/changePwd',
        name: 'changePwd',
        component: resolve => require(['@/components/background/system/log.vue'], resolve)
      },
      // {
      //   path: '/userInfo',
      //   name: 'userInfo',
      //   component: ArticleWrite
      // },
      {
        path: '/pageManage',
        name: 'pageManage',
        component: resolve => require(['@/components/background/other/pageManage.vue'], resolve)
      },
      {
        path: '/commentManage',
        name: 'commentManage',
        component: resolve => require(['@/components/background/other/commentManage.vue'], resolve)
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
