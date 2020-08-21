import Vue from 'vue'
import { httpGet } from '@/utils/request'
import { componentMap } from '@/libraries/router/asyncRoutes'
import {
  SET_ROUTES
} from '../mutation-types'

/**
 * 连接组件和路由
 * @param routes asyncRoutes
 * @param roles 角色
 */
export function setComponentAndRedirect (routes) {
  for (let i = 0; i < routes.length; i++) {
    if (!routes[i].hidden) {
      routes[i].component = componentMap[routes[i].componentName]
      if (routes[i].children) {
        setComponentAndRedirect(routes[i].children)
      }
    }
  }

  return routes
}

const state = {
  routes: []
}

const mutations = {
  [SET_ROUTES]: (state, routes) => {
    state.routes = routes
    Vue.ls.set(SET_ROUTES, routes)
  }
}

const getters = {
  routes: state => state.routes || Vue.ls.get(SET_ROUTES)
}

const actions = {
  // 获取用户相应权限的路由
  generateRoutes ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      const url = '/user/getRoutes'

      httpGet(url, payload).then(res => {
        if (res.code === 20000) {
          const routes = setComponentAndRedirect(res.data)
          // 注意：404 页面一定要最后加载，否则后面的所以页面都会被拦截到 404
          routes.push({ path: '*', redirect: '/404', hidden: true })
          commit(SET_ROUTES, res.data)
          resolve(routes)
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
