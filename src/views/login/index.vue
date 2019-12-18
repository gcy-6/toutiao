<template>
      <div class='login'>
          <el-card class='login-card'>
              <div class='title'>
                  <img src="../../assets/img/logo_index.png" alt="">
              </div>
              <el-form style="margin-top:20px">
                  <el-form-item>
                      <el-input placeholder="请输入您的手机号"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-input style="width:65%"  placeholder="请输入验证码"></el-input>
                      <el-button plain style="float:right">发送验证码</el-button>
                  </el-form-item>
                  <el-form-item>
                      <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" style="width:100%">登录</el-button>
                  </el-form-item>
              </el-form>

          </el-card>
      </div>

      <!-- <div class='login'>

     <el-card class='login-card'>
       <div class='title'>
         <img src="../../assets/img/logo_index.png" alt="">
       </div>

       <el-form style="margin-top:30px">

         <el-form-item>

           <el-input placeHolder="请输入手机号"></el-input>
         </el-form-item>
         <el-form-item>

           <el-input style="width:65%" placeHolder="请输入验证码"> </el-input>
           <el-button style="float:right" plain>发送验证码</el-button>
         </el-form-item>
         <el-form-item>
           <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" style="width:100%">登录</el-button>
         </el-form-item>
       </el-form>
     </el-card>
  </div> -->

</template>

<script>

export default {

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
