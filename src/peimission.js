import Vue from 'vue'
import router from './libraries/router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress' // 页面加载的进度条
import store from '@/libraries/store'
import { SET_TOKEN } from '@/libraries/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress配置

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()
  if (to.path !== '/login') {
    if (!Vue.ls.get(SET_TOKEN)) {
      next({
        path: '/login'
      })
      NProgress.done()
    } else {
      if (store.getters.userInfo.role) {
        next()
      } else {
        try {
          const data = await store.dispatch('getUserInfo')

          const accessRoutes = await store.dispatch('generateRoutes', { payload: data })

          router.addRoutes(accessRoutes)
          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('resetToken')
          next({
            path: '/login'
          })
          NProgress.done()
        }
      }
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
