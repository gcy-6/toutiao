// 拦截访问
import router from '../router'
// 设置全局前置守卫
router.beforeEach(function (to, from, next) {
//   console.log(to)
// 判断拦截地址
  if (to.path !== '/login') {
    // alert(1)
    // 进行权限判断 判断有无token 有的话就放过，没有的话就跳转回到login页面
    // 首先要获取令牌
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
