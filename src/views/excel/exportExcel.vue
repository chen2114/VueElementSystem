<template>
  <div>
    <aside class="flex f-a-between">
      <el-input
        v-model="tableTitle"
        class="w50"
        placeholder="请输入文件名（默认-列表）"
        clearable
      />
      <el-button
        :loading="downloadLoading"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >
        Export Excel
      </el-button>
    </aside>
    <main>
      <ch-table
        :loading="tableLoading"
        :table-data="tableData"
        :row-options="rowOptions"
        :page-options="pageOptions"
        @page-change="handlePageChange"
      />
    </main>
  </div>
</template>
<script>
import rowOptions from '@/tableRowOptions/table/tableData'
import { getTableData } from '@/api/table'
import moment from 'moment'

export default {
  name: 'ExportExcel',
  data () {
    return {
      downloadLoading: false,
      tableTitle: '',
      tableLoading: false,
      tableData: [],
      rowOptions,
      pageOptions: {
        total: 0,
        currentPage: 1,
        pageSize: 10
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
        name: '',
        currentPage: this.pageOptions.currentPage,
        pageSize: this.pageOptions.pageSize
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
    // 导出数据
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '名字', '数量', '时间', '状态']
        const filterVal = ['id', 'name', 'count', 'date', 'state']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel(
          tHeader, // 表头
          data, // 具体数据
          this.tableTitle // 文件名
        )
        this.downloadLoading = false
      })
    },
    // 过滤数据
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        const tmp = { ...v }
        if (j === 'date') {
          tmp[j] = moment(tmp[j]).format('YYYY年MM月DD日 HH:mm:ss')
        }
        if (j === 'state') {
          if (tmp[j] === 1) {
            tmp[j] = '通过'
          } else {
            tmp[j] = '驳回'
          }
        }
        return tmp[j]
      }))
    },
    handlePageChange (val) {
      this.pageOptions.currentPage = val.currentPage
      this.pageOptions.pageSize = val.pageSize
      this.getTableData()
    }
  }
}
</script>
