<template>
  <el-container class="app-wrapper">
    <ch-sidebar
      :class="isCollapse?'sidebar-collaps':'sidebar-expand'"
      :routes="asyncRouter"
      :is-collapse.sync="isCollapse"
    />
    <div
      v-if="!isCollapse"
      class="mask"
      @click="isCollapse = !isCollapse"
    />
    <el-container
      class="main-container"
      :class="isCollapse?'container-collaps':'container-expand'"
    >
      <el-header>
        <ch-header :is-collapse.sync="isCollapse" />
      </el-header>
      <el-main class="relative">
        <router-view :key="key" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import chSidebar from './sidebar/index'
import chHeader from './header/index'
import { SET_ROUTES } from '@/libraries/store/mutation-types'

export default {
  name: 'Layout',
  components: {
    chSidebar,
    chHeader
  },
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    asyncRouter () {
      return this.$ls.get(SET_ROUTES)
    },
    key () {
      return this.$route.path
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
  .main-container {
    transition: width 0.3s;
    transition: margin 0.3s;
    .el-header {
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
  }
  @media screen and (min-width: 769px) {
    .sidebar-collaps {
      width: @sidebar-collaps-width;
    }
    .container-collaps {
      margin-left: @sidebar-collaps-width;
      width: calc(100% - @sidebar-collaps-width);
    }
    .container-expand {
      margin-left: @sidebar-expand-width;
      width: calc(100% - @sidebar-expand-width);
    }
  }
  @media screen and (max-width: 768px) {
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
    .el-drawer {
      width: @sidebar-expand-width !important;
    }
    .sidebar-collaps {
      width: 0;
    }
    .container-collaps, .container-expand {
      margin-left: 0;
      width: 100%;
    }
  }
}
</style>
