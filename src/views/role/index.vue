<template>
  <div>
    <ch-table
      :table-data="tableData"
      :row-options="rowOptions"
    >
      <template slot="other">
        <el-table-column
          label="权限"
          prop="routes"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.routes | filterRoutes }}
            </span>
          </template>
        </el-table-column>
      </template>
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
              @click="handleClick(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </template>
    </ch-table>
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
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleRoutesList } from '@/api/role'
import rowOptions from '@/tableRowOptions/role/roleRoutesList'
import { SET_ROUTES } from '@/libraries/store/mutation-types'
// import { remove } from 'lodash'

export default {
  name: 'Role',
  filters: {
    filterRoutes (val) {
      return JSON.stringify(val)
    }
  },
  data () {
    return {
      dialogVisible: false,
      rowOptions,
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      routesData: [],
      defaultCheck: []
    }
  },
  created () {
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
      this.routesData = this.$ls.get(SET_ROUTES).filter(item => !item.hidden)
      this.getRoutesData(this.routesData)
      this.getDefaultCheck(val.routes)
      this.dialogVisible = true
    },
    getRoutesData (data) {
      for (const item of data) {
        if (!item.meta) {
          item.name = item.children[0].name
          item.label = item.children[0].meta.label
          item.children = []
          if (item.name === 'home') {
            item.disabled = true
          }
        } else {
          item.label = item.meta.label
          if (item.children) {
            this.getRoutesData(item.children)
          }
        }
      }
    },
    // 获取tree默认选中的节点
    getDefaultCheck (data) {
      data.map(item => {
        if (!item.meta) {
          this.defaultCheck.push(item.children[0].name)
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
          let isActive = false
          if (data[i].meta) {
            isActive = activeName.indexOf(data[i].name) !== -1
          } else {
            isActive = activeName.indexOf(data[i].children[0].name) !== -1
          }
          if (isActive) {
            if (data[i].name) {
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
