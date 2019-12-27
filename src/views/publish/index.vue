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
            <!-- <el-input type="textarea" v-model="formData.content"></el-input> -->
            <quill-editor style="height:400px;" v-model="formData.content" type='textarea' :rows="4"></quill-editor>
          </el-form-item>
          <el-form-item prop="type" label="封面" style="margin-top:100px">
            <el-radio-group @change="changeType" v-model="formData.cover.type" >
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>

            <!-- {{formData.cover}} -->
          </el-form-item>
          <cover-image :list="formData.cover.images"></cover-image>
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
        this.getArticleById(to.params.articleId)
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
    // 'formData.cover.type': function () {
    //   // alert(this.formData.cover.type)
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    // 只有在点击触发的时候才会触发change
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
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
          let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
          // console.log('校验成功')
          this.$axios({
            // url: '/articles',
            // method: 'post',
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft },
            data: this.formData

          }).then((result) => {
            this.$router.push('/home/articles')
            // if (articleId) {
          //   // 修改文章
          //   this.$axios({
          //     method: 'put',
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //   // 新增成功 => 应该去内容列表
          //     this.$router.push('/home/articles') // 回到内容列表
          //   })
          // } else {
          // // 可以去进行 发布接口调用
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //   // 新增成功 => 应该去内容列表
          //     this.$router.push('/home/articles') // 回到内容列表
          //   })
          // }
          })
        }
      })
    },
    // 获取文章详情通过id
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    }

  },
  created () {
    this.getChannels()
    // 获取id 判断有无id  有id 就是修改 没id就是发布
    let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
    articleId && this.getArticleById(articleId) // 获取文章数据
  }

}
</script>

<style>

</style>
