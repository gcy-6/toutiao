<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态:</span>
      </el-col>
      <el-col :span="18">
        <el-radio-group v-model="formData.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表:</span>
      </el-col>
      <el-col :span="18">
        <el-select @change="changeCondition" placeholder="请选择" v-model="formData.channels_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择:</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row class="total">
      <span>共显示0条内容</span>
    </el-row>
    <el-row v-for="item in list" :key="item.id.toString()" type="flex" justify="space-between" class="article-item">
      <!-- {{item}} -->
      <el-col :span="14">
        <el-row type="flex">
          <!-- <el-col :span="4"> -->
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
          <!-- </el-col> -->
          <!-- <el-col :span="9"> -->
          <div class="info">
            <p>{{item.title}}</p>
            <el-tag class="tag" :type="item.status|filterType">{{item.status|filterStatus}}</el-tag>
            <p class="date">{{item.pubdate}}</p>
          </div>
          <!-- </el-col> -->
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i> 删除
          </span>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channels_id: null,
        dateRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    changeCondition () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channels_id,
        begin_pubdate: this.formData.dateRange.length
          ? this.formData.dateRange[0]
          : null,
        end_pubdate:
          this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // changeCondition () {
    //   // 组装条件
    //   // 最新状态
    //   let params = {
    //     status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 5代表全部
    //     channel_id: this.formData.channel_id, // 频道
    //     begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起始时间
    //     end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 截止时间
    //   }
    //   this.getArticles(params) // 调用获取文章数据
    // },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    margin-left: 50px;
  }
}
.total {
  border-bottom: 1px dashed #ccc;
  padding: 10px 0;
}

.article-item {
  padding: 20px;
  border-bottom: 1px solid #f2f3f5;
  img {
    width: 150px;
    height: 140px;
  }
  .info {
    margin-left: 25px;
  }
}
</style>
