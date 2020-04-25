<template>
  <div>
    <ch-table
      showIndex
      :table-data="tableData"
      :row-options="rowOptions"
      @row-click="rowClick"
    >
    </ch-table>
  </div>
</template>
<script>
import rowOptions from '@/tableRowOptions/table/tableData'
import { getTableData } from '@/api/table'
export default {
  name: 'Table',
  data () {
    return {
      rowOptions,
      tableData: []
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      const payload = {
        name: '0'
      }
      getTableData(payload)
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    rowClick (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less">

</style>
