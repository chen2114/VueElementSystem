import 'babel-polyfill'
import Es6Promise from 'es6-promise'

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
import './libraries/echarts' // 引入图表
import './libraries/countTo' // 引入数字滚动

import './components' // 引入全局组件
import './filters' // 引入全局过滤器

Es6Promise.polyfill()

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
