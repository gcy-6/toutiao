<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材" name="material">
      <div class="select-img-list">
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 分页 -->
      <el-row type="flex" justify="center">
          <el-pagination background layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"></el-pagination>
      </el-row>

    </el-tab-pane>
    <el-tab-pane label="上传" name="upload">上传</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    clickImg (url) {
      // alert(url)
      // 把地址传出去 字符传值 $emit 第一个参数是事件名称（需小写），第二个参数是若干参数
      this.$emit('selectOneImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 150px;
    height: 150px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
