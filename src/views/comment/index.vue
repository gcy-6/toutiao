<template>
  <!-- <div>评论列表</div> -->
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">评论列表</template>
      </bread-crumb>
      <el-table :data='list' >
          <el-table-column prop='title' label="标题" width=700></el-table-column>
          <el-table-column :formatter='formatterBool' prop='status' label="评论状态"></el-table-column>
          <el-table-column prop='total_comment_count' label="总评论数"></el-table-column>
          <el-table-column prop='fans_comment_count' label="粉丝评论数"></el-table-column>
          <el-table-column label="操作">
                  <template slot-scope="obj">
                    <el-button type="text">修改</el-button>
                      <el-button type="text">{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
                  </template>

          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        // console.log(result)
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
