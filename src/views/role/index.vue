<template>
  <div>
    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: 100%"
    >
      <el-table-column
        prop="role"
        label="角色"
        header-align="center"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        label="权限"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.routes | filterRoutes }}
          </div>
        </template>
      </el-table-column>
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
            @click="handleClick(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="900px"
    >
      <el-tree
        ref="tree"
        :data="routesData"
        :props="defaultProps"
        :default-checked-keys="defaultCheck"
        node-key="name"
        show-checkbox
        accordion
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleRoutesList } from '@/api/role'
import { SET_ROUTES } from '@/libraries/store/mutation-types'
// import { remove } from 'lodash'

export default {
  name: 'Role',
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      routesData: [],
      defaultCheck: []
    }
  },
  filters: {
    filterRoutes (val) {
      return JSON.stringify(val)
    }
  },
  mounted () {
    this.getRoleRoutesList()
  },
  methods: {
    // 获取角色routes列表
    async getRoleRoutesList () {
      const res = await getRoleRoutesList()
      this.tableData = res.data
    },
    // 打开弹窗
    handleClick (val) {
      this.defaultCheck = []
      const arr = []
      this.$ls.get(SET_ROUTES).map(item => {
        const tmp = { ...item }
        if (!tmp.hidden) {
          if (tmp.alwaysShow) {
            tmp.children = []
          }
          if (tmp.label === '主页') {
            tmp.disabled = true
          }
          arr.push(tmp)
        }
      })
      this.routesData = arr
      this.getDefaultCheck(val.routes)
      this.dialogVisible = true
      // DOM的异步更新
      // this.$nextTick(() => {
      //   this.$refs.tree.setCheckedNodes(val.routes)
      // })
    },
    // 获取tree默认选中的节点
    getDefaultCheck (data) {
      data.map(item => {
        if (item.alwaysShow) {
          this.defaultCheck.push(item.name)
        } else {
          if (item.children) {
            this.getDefaultCheck(item.children)
          } else {
            this.defaultCheck.push(item.name)
          }
        }
      })
    },
    // 确认编辑
    confirm () {
      const keys = this.$refs.tree.getCheckedKeys()
      const nodes = this.$refs.tree.getHalfCheckedKeys()
      const activeName = [...keys, ...nodes]
      const roleAsyncRouter = this.$ls.get(SET_ROUTES)
      this.editRoutes(roleAsyncRouter, activeName)
      console.log(roleAsyncRouter)
    },
    // 编辑routes
    editRoutes (data, activeName) {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].hidden) {
          data.splice(i, 1)
        } else {
          const isActive = activeName.indexOf(data[i].name) !== -1
          if (isActive) {
            if (!data[i].alwaysShow) {
              if (data[i].children) {
                this.editRoutes(data[i].children, activeName)
              }
            }
          } else {
            data.splice(i, 1)
          }
        }
      }
    }
  }
}
</script>
