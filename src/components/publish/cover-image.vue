<template>
  <div class="cover-image">
    <div class="cover-item" @click="openDialog(index)" v-for="(item,index) in list" :key="index">
      <img :src="item?item:defaultImg" alt />
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
        <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1
    }
  },
  methods: {
    receiveImg (img) {
      // alert(img)
      // list 为props，要想修改必须再次传递
      this.$emit('clickOneImg', img, this.selectIndex)
      this.closeDialog()
    },
    openDialog (index) {
      this.selectIndex = index
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
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
