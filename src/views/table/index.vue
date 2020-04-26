<template>
  <div class="table">
    <el-autocomplete
      class="m-b20"
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
import { getTableData, getName } from '@/api/table'
export default {
  name: 'Table',
  data () {
    return {
      restaurants: [],
      name: '',
      rowOptions,
      tableData: []
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
    getTableData () {
      const payload = {
        name: this.name
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

</style>
