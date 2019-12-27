<template>
  <div class="cover-image">
    <div class="cover-item" v-for="(item,index) in list" :key="index">
      <img src="../../assets/img/pic_bg.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
.cover-image {
  display: flex;
  margin: 20px 10px;
  margin-left: 120px;

  .cover-item {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
