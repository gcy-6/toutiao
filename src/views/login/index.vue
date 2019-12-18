<template>
      <div class='login'>
          <el-card class='login-card'>
              <div class='title'>
                  <img src="../../assets/img/logo_index.png" alt="">
              </div>
              <el-form style="margin-top:20px" :model='loginForm' :rules='loginRules' ref="myForm">
                  <el-form-item prop='mobile'>
                      <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
                  </el-form-item>
                  <el-form-item prop='code'>
                      <el-input style="width:65%" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                      <el-button plain style="float:right">发送验证码</el-button>
                  </el-form-item >
                  <el-form-item prop='check'>
                      <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                      <el-button @click='submitLogin' type="primary" style="width:100%">登录</el-button>
                  </el-form-item>
              </el-form>

          </el-card>
      </div>

</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入正确的验证码' }, { pattern: /^\d{6}$/, message: '验证码为6位' }],
        // 自定义校验函数
        // value 我们要校验的字段的值
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('请先勾选'))
          }
        } }]

      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate(function (isOK) {
        console.log('请先调用接口')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// scoped属性是只会对当前的组件样式产生作用，原理是为当前的标签生成data-v-随机数
.login {
    // 相当于当前可视区域的100%高度
    height: 100vh;
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-card {
        width: 400px;
        height: 340px;

        .title {
            text-align: center;

            img {
                height: 44px;
            }
        }
    }
}
</style>
