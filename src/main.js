import Vue from 'vue'
import App from './App.vue'

import './libraries/storage' // 本地存储
import router from './libraries/router'
import store from './libraries/store'
import './peimission' // 权限控制

import { ICONS_MAP } from './libraries/store/mutation-types'

import './libraries/mock' // mock 随机数据
import './libraries/element-ui' // 引入element-ui
import './libraries/fragment' // 解决导航收起文字没隐藏问题

import './components' // 引入全局组件

// 导入 SVG
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg/', true, /\.svg$/)
requireAll(req)
store.commit(ICONS_MAP, requireAll(req)) // 将svg数组存进vuex

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
