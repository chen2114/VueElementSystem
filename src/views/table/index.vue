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
  </div>
</template>
<script>
import rowOptions from '@/tableRowOptions/table/tableData'
import { getTableData, getName } from '@/api/table'
export default {
  name: 'Table',
  data () {
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
  mounted () {
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
