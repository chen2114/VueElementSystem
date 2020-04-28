<template>
  <div class="ch-table">
    <el-table
      ref="chTable"
      class="w100"
      v-loading="loading"
      border
      size="mini"
      tooltip-effect="dark"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      :data="tableData"
      :height="height || tableHeight"
      :max-height="maxHeight"
      :empty-text="emptyText"
      :highlight-current-row="highlightCurrentRow"
      :row-key="accordion || reserve ? getRowKeys : null"
      :expand-row-keys="accordion ? expands : null"
      @row-click="rowClick"
      @expand-change="expandChange"
      @sort-change="handleSortChange"
      @select="handleSelection"
      @select-all="handleSelectionAll"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        align="center"
        header-align="center"
        :width="60"
        :resizable="false"
      />
      <el-table-column
        v-if="showSelection"
        type="selection"
        align="center"
        header-align="center"
        :width="60"
        :resizable="false"
        :reserve-selection="reserve"
      />
      <template v-for="(item, index) in rowOptions">
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :align="item.align || 'center'"
          :header-align="item.headerAlign || 'center'"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :resizable="item.resizable"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span
              v-if="item.filter"
              :style="{'color': setFilterColor(scope.row[item.prop],item.filter)}"
            >
              {{ scope.row[item.prop] | toText(item.filter) }}
            </span>
            <span v-else-if="item.format">
              {{ scope.row[item.prop] | dateFormat(item.format) }}
            </span>
            <span
              v-else
              :style="{color: item.color}"
              :class="{'cursor': item.isLink}"
            >
              {{ scope.row[item.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>
      <slot name="other" />
    </el-table>
    <el-pagination
      v-if="pageOptions && pageOptions.total"
      :current-page="pageOptions.currentPage"
      :page-sizes="pageOptions.pageSizes"
      :page-size="pageOptions.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageOptions.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { findIndex } from 'lodash'

export default {
  name: 'ChTable',
  filters: {
    toText (value, opt) {
      const tmp = opt.filter(item => item.value === value)
      if (tmp.length) {
        return tmp[0].label
      } else {
        return value
      }
    }
  },
  props: {
    tableData: {
      // 表格的数据
      type: Array,
      default: () => []
    },
    loading: {
      // 是否显示加载动画
      type: Boolean,
      default: false
    },
    height: {
      // 表格的高度
      type: String,
      default: null
    },
    maxHeight: {
      // 表格的最大高度
      type: String,
      default: null
    },
    emptyText: {
      // 空数据时显示的文本内容
      type: String,
      default: '暂无数据'
    },
    highlightCurrentRow: {
      // 行点击高亮
      type: Boolean,
      default: true
    },
    accordion: {
      // 折叠行是否支持手风琴效果
      type: Boolean,
      default: false
    },
    rowOptions: {
      // 表格的配置 json
      type: Array,
      default: () => []
    },
    showIndex: {
      // 是否显示索引号
      type: Boolean,
      default: false
    },
    showSelection: {
      // 是否显示多选框
      type: Boolean,
      default: false
    },
    reserve: {
      // 保留选中的数据
      type: Boolean,
      default: false
    },
    pageOptions: {
      // 分页的配置
      type: Object,
      default: () => {
        return {
          total: 0,
          pageSizes: [10, 20, 30, 50],
          pageSize: 10,
          currentPage: 1
        }
      }
    }
  },
  data () {
    return {
      tableHeight: 70,
      expands: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - this.$refs.chTable.$el.offsetTop - 70
      // 监听窗口大小变化
      const self = this
      window.onresize = () => {
        self.tableHeight = window.innerHeight - self.$refs.chTable.$el.offsetTop - 70
      }
    })
  },
  methods: {
    setFilterColor (value, opt) {
      const tmp = opt.filter(item => item.value === value)
      if (tmp.length) {
        return tmp[0].color
      } else {
        return ''
      }
    },
    getRowKeys (row) {
      if (this.accordion || this.reserve) {
        return findIndex(this.tableData, row)
      }
    },
    expandChange (row) {
      if (this.accordion) {
        const index = findIndex(this.tableData, row)
        if (this.expands.includes(index)) {
          this.expands = []
        } else {
          this.expands = []
          this.expands.push(index)
        }
      }
    },
    /**
     * @method rowClick 行点击回调
     * @param {Object} Row
     */
    rowClick (Row, Event, Column) {
      const data = {
        row: Row,
        event: Event,
        column: Column
      }
      this.$emit('row-click', data)
    },
    /**
       * @method handleSortChange 排序回调
       * @param {Object} val
       */
    handleSortChange ({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    /**
       * @method handleSelection  手动选中回调
       * @param {Array} val 当前选中数据
       * @param {Object} row 点击行数据
       */
    handleSelection (val, row) {
      this.$emit('select', val, row)
    },
    /**
       * @method handleSelectionAll  手动全选回调
       * @param {Array} val 当前选中数据
       */
    handleSelectionAll (val) {
      this.$emit('select-all', val)
    },
    /**
       * @method handleSelectionChange  多选回调
       * @param {Array} val 当前选中数据
       */
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    },
    /**
       * @method handleSizeChange pageSize 改变时会触发
       * @param {Number} val 每页条数
       */
    handleSizeChange (val) {
      this.$emit('page-change', {
        currentPage: this.pageOptions.currentPage,
        pageSize: val
      })
    },
    /**
       * @method handleCurrentChange currentPage 改变时会触发
       * @param {Number} val 当前页
       */
    handleCurrentChange (val) {
      this.$emit('page-change', {
        currentPage: val,
        pageSize: this.pageOptions.pageSize
      })
    }
  }
}
</script>
<style lang="less">
.ch-table {
  text-align: center;
  .el-pagination {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    padding: 0;
  }
}
</style>
