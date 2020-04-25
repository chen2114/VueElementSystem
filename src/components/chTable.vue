<template>
  <div class="table-container">
    <el-table
      ref="ehTable"
      class="eh-table w100 h100"
      v-loading="loading"
      border
      size="mini"
      tooltip-effect="dark"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :highlight-current-row="highlightCurrentRow"
      :row-key="accordion ? getRowKeys : null"
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
        :reserve-selection="accordion"
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
      default: '600px'
    },
    maxHeight: {
      // 表格的最大高度
      type: String,
      default: '800px'
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
    }
  },
  data () {
    return {
      expands: []
    }
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
      if (this.accordion) {
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
    }
  }
}
</script>
