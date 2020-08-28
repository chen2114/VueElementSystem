<template>
  <el-container class="app-wrapper">
    <ch-sidebar
      :class="isCollapse?'sidebar-collaps':'sidebar-expand'"
      :routes="asyncRouter"
      :is-collapse="isCollapse"
    />
    <el-container
      class="main-container"
      :class="isCollapse?'container-collaps':'container-expand'"
    >
      <el-header>
        <ch-header @collapse-change="collapseChange" />
      </el-header>
      <el-main>
        <router-view :key="key" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import chSidebar from './sidebar'
import chHeader from './header'
import { SET_ROUTES } from '@/libraries/store/mutation-types'

export default {
  name: 'Layout',
  components: {
    chSidebar,
    chHeader
  },
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    asyncRouter () {
      return this.$ls.get(SET_ROUTES)
    },
    key () {
      return this.$route.path
    }
  },
  methods: {
    collapseChange () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less">
.app-wrapper {
  height: 100%;
  .sidebar-expand {
    width: @sidebar-expand-width;
  }
  .sidebar-collaps {
    width: @sidebar-collaps-width;
  }
  .main-container {
    transition: width 0.3s;
    transition: margin 0.3s;
  }
  .container-expand {
    margin-left: @sidebar-expand-width;
    width: calc(100% - @sidebar-expand-width);
  }
  .container-collaps {
    margin-left: @sidebar-collaps-width;
    width: calc(100% - @sidebar-collaps-width);
  }
}
</style>
