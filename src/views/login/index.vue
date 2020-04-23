<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="50px"
      class="demo-ruleForm"
      @keyup.enter.native="submitForm('ruleForm')"
    >
      <el-form-item
        label="账号"
        prop="account"
      >
        <el-input v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pass"
      >
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native.prevent="submitForm('ruleForm')"
        >
          登录
        </el-button>
        <el-button @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        account: '',
        pass: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/login'
          const payload = {
            account: this.ruleForm.account,
            password: this.ruleForm.pass
          }
          this.login({ url, payload })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  .demo-ruleForm {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 500px;
    height: 200px;
    margin: auto;
  }
}
</style>
