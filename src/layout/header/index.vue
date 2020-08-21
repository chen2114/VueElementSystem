<template>
  <div class="header-container">
    <div class="header-container-left">
      <i
        :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
        @click="collapseChange"
      />
      <breadcrumb class="m-l20" />
    </div>
    <div class="header-container-right">
      <screenfull />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar
            shape="square"
            size="medium"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item
            command="logout"
            divided
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import breadcrumb from './breadcrumb'
import screenfull from './screenfull'

export default {
  name: 'Header',
  components: {
    breadcrumb,
    screenfull
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions(['logout']),
    // 退出
    handleCommand (val) {
      if (val === 'logout') {
        this.logout()
      }
    },
    // 导航展开收起事件回调
    collapseChange () {
      this.$emit('update:is-collapse', !this.isCollapse)
    }
  }
}
</script>
<style lang="less">
.header-container {
  width: 100%;
  height: @header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    i {
      font-size: 25px;
      cursor: pointer;
    }
  }
  &-right {
    display: flex;
    align-items: center;
    .el-avatar {
      cursor: pointer;
    }
  }
}
</style>
