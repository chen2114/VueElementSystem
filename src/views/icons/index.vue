<template>
  <div class="icons-wrapper">
    <div
      v-for="(item, index) in iconsMap"
      :key="index"
      class="icon-item"
      @click="copyIcon(item)"
    >
      <el-tooltip
        class="item"
        effect="dark"
        :content="`<ch-svg :icon-class='${item}' :size='25' color='#000' />`"
        placement="top"
      >
        <div>
          <ch-svg
            :icon-class="item"
            :size="25"
            color="#000"
          />
          <span>{{ item }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import clipboard from '@/utils/clipboard'
import { mapGetters } from 'vuex'

export default {
  name: 'Icons',
  computed: {
    ...mapGetters(['iconsMap'])
  },
  methods: {
    copyIcon (data) {
      clipboard(`<ch-svg icon-class='${data}' :size='25' color='#000' />`)
    }
  }
}
</script>
<style lang="less">
.icons-wrapper {
  .icon-item {
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    cursor: pointer;
    .ch-svg {
      pointer-events: none; // 阻止元素的鼠标事件，解决clipboard获取该元素的target报错问题
    }
    span {
      display: block;
      margin-top: 20px;
    }
  }
}
</style>
