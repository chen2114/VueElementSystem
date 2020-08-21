/**
 * constantRoutes
 * 无需权限的路由
 */

// const layout = () => import('@/layout/index')

export const constantRoutes = [
  {
    name: 'login',
    path: '/login',
    hidden: true,
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    name: '404',
    path: '/404',
    hidden: true,
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404')
  }
]
