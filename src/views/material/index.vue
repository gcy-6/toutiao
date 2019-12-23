<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

    <el-row type='flex' justify='end'>
      <el-upload :show-file-list='false' :http-request='uploadImg' action="abc">
        <el-button size="small" type="primary">文件上传</el-button>
      </el-upload>
    </el-row>

    <!-- <el-row type='flex' justify="end">
        <el-upload :http-request="uploadImg" :show-file-list="false">
              <el-button  size="small" type="primary">点击上传</el-button>
        </el-upload>
    </el-row> -->

    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
          @current-change='changePage'></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <!-- <el-row class="operate" type='flex' justify='space-around' align='middle'>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-delete"></i>
            </el-row>-->
          </el-card>
        </div>
        <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
          @current-change='changePage'></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let form = new FormData()
      form.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: form
      }).then(result => {
        this.loading = false
        this.getAllMaterial()
      })
    },
    // uploadImg (params) {
    //   this.loading = true // 打开进度条
    //   let form = new FormData()
    //   form.append('image', params.file) // 添加文件到formData
    //   this.$axios({
    //     method: 'post',
    //     url: '/user/images',
    //     data: form // formData数据
    //   }).then(result => {
    //     //   说明已经上传成功了一张图片
    //     this.loading = false // 关闭进度条
    //     this.getAllMaterial()
    //   })
    // },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect',
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
    this.getAllMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 220px;
    margin: 10px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
    }
  }
}
</style>
