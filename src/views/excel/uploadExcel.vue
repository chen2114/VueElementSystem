<template>
  <div class="tc">
    <el-upload
      drag
      action="#"
      :auto-upload="false"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-error="handleError"
      :on-change="handleChange"
      accept=".xlsx,.xls"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div
        slot="tip"
        class="el-upload__tip"
      >
        只能上传excel文件，且不超过5MB
      </div>
    </el-upload>
    <ch-table
      class="m-t20"
      :table-data="tableData"
      :row-options="rowOptions"
    />
  </div>
</template>
<script>
import readExcel from '@/utils/readExcel'

export default {
  name: 'UploadExcel',
  data () {
    return {
      tableData: [],
      rowOptions: []
    }
  },
  methods: {
    // 上传图片限制
    beforeUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
      }
      return isLt5M
    },
    handleChange (file) {
      readExcel(file).then(res => {
        this.tableData = res[0].sheet
        this.rowOptions = []
        for (const key in res[0].sheet[0]) {
          const tmp = {
            label: key,
            prop: key
          }
          this.rowOptions.push(tmp)
        }
      })
    },
    // 上传成功
    handleSuccess (res) {
      console.log(res)
    },
    // 上传图片失败
    handleError () {
      this.$message.error('上传文件失败，请重新上传 !!!')
    }
  }
}
</script>
