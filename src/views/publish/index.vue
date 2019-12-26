<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">发布文章</template>
      </bread-crumb>

      <el-form style="margin-left:50px" label-width="100px" ref="publishForm" :model="formData" :rules="publishRules">
          <el-form-item prop="title" label="标题">
            <el-input style="width:60%" placeholder="文章名称" v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
            <el-input type="textarea" v-model="formData.content"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="封面">
            <el-radio-group v-model="formData.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="channel_id" label="频道">
            <el-select v-model="formData.channel_id">
              <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="publishArticle()">发表</el-button>
              <el-button @click="publishArticle(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      channels: [],
      // value: '',
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度需要在5到30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        //  有参数  => 修改
      } else {
        // 没有参数  => 发布 // 没有参数  => 发布
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          }
        }
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // console.log('校验成功')
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft },
            data: this.formData

          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannels()
  }

}
</script>

<style>

</style>
