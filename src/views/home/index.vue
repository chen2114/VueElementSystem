<template>
  <div class="home">
    <div class="home-warp" />
    <div class="home-logo">
      <img src="@/assets/logo.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      value: ''
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  .home-warp {
    width: 400px;
    height: 200px;
    background: url("~@/assets/404.png") no-repeat;
    background-size: cover;
  }
  .home-logo {
    width: 150px;
    height: 150px;
    border: 1px solid red;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
