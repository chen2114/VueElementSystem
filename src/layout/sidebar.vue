<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        router
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="item in routes">
          <sidebar-item
            v-if="!item.hidden"
            :key="item.name"
            :route="item"
            :base-path="item.path"
          />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import sidebarItem from './sidebarItem'

export default {
  name: 'Sidebar',
  components: {
    sidebarItem
  },
  props: {
    routes: {
      type: Array,
      required: true,
      default: () => []
    },
    isCollapse: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    activeMenu () {
      const path = this.$route.path
      if (path === '/home') {
        return '/'
      }
      return path.replace('/index', '')
    }
  }
}
</script>
<style lang="less">
.sidebar-container {
  width: @sidebar-expand-width;
  transition: width 0.3s;
  background-color: #545c64;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }
  .el-scrollbar {
    height: 100%;
  }
  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }
  .is-horizontal {
    display: none;
  }
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
}
</style>
