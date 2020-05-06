<template>
  <div class="avatar-upload flex f-a-around f-wrap">
    <aside class="w100 m-b30">
      <a href="https://github.com/dai-siki/vue-image-crop-upload" target="_blank">vue-image-crop-upload</a>
    </aside>
    <my-upload
      v-model="show"
      url=""
      field="Avatar"
      img-format="png"
      langType='zh'
      :width="200"
      :height="200"
      :noRotate='false'
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
    <div
      class="cursor"
      @click="toggleShow"
    >
      <el-avatar
        shape="circle"
        :size="150"
        :src="circleUrl"
      >
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </div>
    <div>
      <el-upload
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-error="handleError"
        :on-change="handleChange"
        accept="image/jpeg,image/png,image/jpg"
      >
        <el-avatar
          shape="square"
          :size="150"
          :src="squareUrl"
        >
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </el-upload>
    </div>
  </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload'

export default {
  name: 'AvatarUpload',
  data () {
    return {
      show: false,
      circleUrl: '',
      squareUrl: ''
    }
  },
  components: {
    myUpload
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgUrl, field) {
      this.circleUrl = imgUrl // base64格式
    },
    // 上传成功回调
    cropUploadSuccess (jsonData, field) {
      console.log(jsonData, field)
    },
    // 上传失败回调
    cropUploadFail (status, field) {
      console.log(status, field)
    },
    // 上传图片限制
    beforeUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isLt10M
    },
    handleChange (file) {
      this.squareUrl = URL.createObjectURL(file.raw)
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
