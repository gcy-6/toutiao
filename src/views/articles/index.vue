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
        <el-radio-group v-model="formData.status">
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
        <el-select placeholder="请选择" v-model="formData.channels_id">
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
          v-model="formData.dataRange"
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
    <el-row v-for="item in 100" :key="item" type="flex" justify="space-between" class="article-item">
      <el-col :span="14">
        <el-row type="flex">
          <!-- <el-col :span="4"> -->
            <img src="../../assets/img/avatar.jpg" alt />
          <!-- </el-col> -->
          <!-- <el-col :span="9"> -->
            <div class="info">
              <p>hhh</p>
              <el-tag class="tag">标签一</el-tag>
              <p class="date">2019-12-24 17:53:01</p>
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
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
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
        margin-left: 25px
    }
}
</style>
