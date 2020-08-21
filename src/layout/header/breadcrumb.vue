<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="index"
    >
      <router-link
        v-if="item.path !== $route.path"
        :to="item.path"
      >
        {{ item.meta.label }}
      </router-link>
      <span
        v-else
        style="color: #97a8be;"
      >
        {{ item.meta.label }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // 仅显示有meta.label的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.label)
      const first = matched[0]
      if (!this.isHome(first)) {
        matched = [{ path: '/home', meta: { label: '主页' } }].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.label)
    },
    isHome (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name === 'home'
    }
  }
}
</script>
<style lang="less">
.el-breadcrumb__inner a {
  font-weight: 400;
}
</style>
