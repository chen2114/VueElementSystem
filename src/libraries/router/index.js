import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes } from './constantRoutes'
// import { asyncRoutes } from './asyncRoutes'

// 对Router原型链上的push、replace方法进行重写，解决控制台 Uncaught (in promise) 报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'hash',
  // 当切换到新路由时，页面滚动
  scrollBehavior (to, from, savedPosition) {
    // savedPosition 通过浏览器的 前进/后退 按钮触发
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes
})

const router = createRouter()

// 详情请看: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
