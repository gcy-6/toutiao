<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">素材管理</template>
      </bread-crumb>
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部" name='all'>
              <div class="img-list">
                  <el-card class="img-card" v-for="item in list" :key="item.id">
                      <img :src="item.url" alt="">
                      <el-row class="operate" type='flex' justify='space-around' align='middle'>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-delete"></i>
                      </el-row>
                  </el-card>
              </div>
          </el-tab-pane>
          <el-tab-pane label="收藏" name='collect'>
              <div class="img-list">
                  <el-card class="img-card" v-for="item in list" :key="item.id">
                      <img :src="item.url" alt="">
                      <!-- <el-row class="operate" type='flex' justify='space-around' align='middle'>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-delete"></i>
                      </el-row> -->
                  </el-card>
              </div>
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    changeTab () {
      this.getAllMaterial()
    },
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getAllMaterial()
  }

}
</script>

<style lang='less' scoped>
.img-list{
    display: flex;
    flex-wrap: wrap;
    .img-card{
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
             font-size:20px;
             position: absolute;
             bottom: 0;
             left:0;
             background-color: #f4f5f6;
             height:30px;
        }
    }
}

</style>
