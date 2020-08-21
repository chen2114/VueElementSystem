<template>
  <div class="table">
    <div class="flex f-a-between f-vc m-b20">
      <el-button
        type="primary"
        size="small"
        @click.stop="handleClearSelection"
      >
        清空选择
      </el-button>
      <el-autocomplete
        v-model="name"
        clearable
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      >
        <template slot-scope="{item}">
          <div class="label">
            {{ item.label }}
          </div>
        </template>
      </el-autocomplete>
    </div>
    <ch-table
      ref="teamStaffTable"
      show-index
      show-selection
      accordion
      reserve
      :loading="tableLoading"
      :table-data="tableData"
      :row-options="rowOptions"
      :page-options="pageOptions"
      @row-click="rowClick"
      @sort-change="handleSortChange"
      @page-change="handlePageChange"
      @selection-change="handleSelectionChange"
    >
      <template slot="other">
        <el-table-column
          label="操作"
          width="100"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.stop="handleClick(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </template>
      <template slot="other">
        <el-table-column
          label="详情"
          width="100"
          type="expand"
        >
          <template slot-scope="{row}">
            <ch-table
              show-selection
              height="100%"
              :table-data="row.childData"
              :row-options="rowOptions"
            />
          </template>
        </el-table-column>
      </template>
    </ch-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="900px"
    >
      <el-form
        ref="ruleForm"
        label-position="right"
        label-width="100px"
        size="small"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item
          label="用户名"
          prop="userName"
        >
          <el-input
            v-model="ruleForm.userName"
            placeholder="请输入用户名称"
            maxlength="8"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="年龄"
          prop="age"
        >
          <el-input
            v-model.number="ruleForm.age"
            placeholder="请输入年龄"
          />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item
          label="网址"
          prop="url"
        >
          <el-input
            v-model="ruleForm.url"
            placeholder="请输入网络地址"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            maxlength="16"
            type="password"
            placeholder="请输入新密码"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPassword"
        >
          <el-input
            v-model="ruleForm.checkPassword"
            type="password"
            placeholder="请再次输入新密码"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import rowOptions from '@/tableRowOptions/table/tableData'
import { getTableData, getName } from '@/api/table'
import { validURL } from '@/utils/validate'

export default {
  name: 'Table',
  data () {
    const validateUrl = (rule, value, callback) => {
      if (!validURL(value)) {
        callback(new Error('请输入正确的网站地址!'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      restaurants: [],
      name: '',
      rowOptions,
      tableData: [],
      tableLoading: false,
      tableSort: {
        order: '',
        prop: ''
      },
      pageOptions: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      dialogVisible: false,
      ruleForm: {
        userName: '',
        age: '',
        email: '',
        url: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        userName: {
          required: true,
          message: '请填写用户名',
          trigger: ['blur', 'change']
        },
        age: [
          {
            required: true,
            message: '年龄不能为空',
            trigger: ['blur', 'change']
          },
          {
            type: 'number',
            message: '年龄必须为数字值',
            trigger: ['blur', 'change']
          }
        ],
        email: [
          {
            required: true,
            message: '请填写邮箱',
            trigger: ['blur', 'change']
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        url: [
          {
            required: true,
            message: '请填写网络地址',
            trigger: ['blur', 'change']
          },
          { validator: validateUrl, trigger: ['blur', 'change'] }
        ],
        password: [
          {
            required: true,
            message: '请填写密码',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^(?![0-9@_]+$)(?![a-zA-Z@_]+$)[0-9A-Za-z@_]{8,16}$/,
            message: '密码应当包含数字字母组合, 长度要求 8 到 16 位',
            trigger: ['blur', 'change']
          }
        ],
        checkPassword: [
          {
            required: true,
            message: '请再次填写密码',
            trigger: ['blur', 'change']
          },
          { validator: validatePass, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  watch: {
    name (val) {
      if (!val) {
        this.getTableData()
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取数据
    getTableData () {
      const payload = {
        name: this.name,
        currentPage: this.pageOptions.currentPage,
        pageSize: this.pageOptions.pageSize,
        ...this.tableSort
      }
      this.tableLoading = true
      getTableData(payload)
        .then(res => {
          this.tableData = res.data
          this.pageOptions.total = res.total
          // console.log(res)
        })
        .then(_ => {
          this.tableLoading = false
        })
        .catch(_ => {
          this.tableLoading = false
        })
    },
    // 表格行点击
    rowClick (data) {
      console.log(data)
    },
    // 编辑
    handleClick (data) {
      console.log(data)
      this.dialogVisible = true
    },
    // 提交
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields()
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 清空表格多选
    handleClearSelection () {
      const thisRef = this.$refs.teamStaffTable
      if (thisRef) {
        const tableRef = thisRef.$refs.chTable
        tableRef.clearSelection()
      }
    },
    // 表格多选
    handleSelectionChange (data) {
      console.log(data)
    },
    // 排序
    handleSortChange ({ prop, order }) {
      this.tableSort = {
        prop,
        order
      }
      this.getTableData()
    },
    // 分页
    handlePageChange (val) {
      this.pageOptions.currentPage = val.currentPage
      this.pageOptions.pageSize = val.pageSize
      this.getTableData()
    },
    // 搜索
    querySearchAsync (queryString, cb) {
      getName().then(res => {
        const restaurants = res.data
        const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        cb(results)
      })
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.name = item.label
      this.getTableData()
    }
  }
}
</script>
<style lang="less">
.table {
  height: 100%;
}
</style>
