<template>
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <el-col class="left" :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="4">
      <el-row type="flex" justify="end" align="middle">
        <img :src="!userInfo.photo?userInfo.photo:defaultImg" alt />
        <el-dropdown @command="handle">
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      // 图片限制大小 小于10k的时候会转成base64字符串，而大于10k的时候会改变路径拷贝到静态目录下
      // img死地址，动态地址的话，默认情况下不会转为base64 也不会拷贝
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    // let token = window.localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(result => {
      this.userInfo = result.data
      // console.log(this.userInfo)
      // console.log(result)
    })
  },
  methods: {
    handle (command) {
      if (command === 'lgout') {
        // 清除令牌
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/89heimatoutiao'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 18px;
    .title {
      color: #2c3e50;
      font-size: 16px;
      margin-left: 4px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
