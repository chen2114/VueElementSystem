<template>
  <div class="header-container">
    <div class="header-container-left">
      <i
        :class="icon"
        @click="collapseChange"
      />
    </div>
    <div class="header-container-right">
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

export default {
  name: 'Header',
  data () {
    return {
      icon: 'el-icon-s-fold'
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleCommand (val) {
      if (val === 'logout') {
        this.logout()
      }
    },
    collapseChange () {
      if (this.icon === 'el-icon-s-unfold') {
        this.icon = 'el-icon-s-fold'
      } else {
        this.icon = 'el-icon-s-unfold'
      }
      this.$emit('collapse-change')
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
    i {
      font-size: 25px;
      cursor: pointer;
    }
  }
  &-right {
    .el-avatar {
      cursor: pointer;
    }
  }
}
</style>
