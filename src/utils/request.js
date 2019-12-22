// 封装axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JsonBigInt from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 请求成功
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function () { // 请求失败
})
axios.defaults.transformResponse = [function (data) {
  return JsonBigInt.parse(data)
}]
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 响应成功
  return response.data ? response.data : {}
}, function (error) {
  // 响应失败
//   console.log(error)
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      window.localStorage.removeItem('user-token')
      router.push('/login')
      // refresh-token未携带或已过期
      //   message = ''
      break
    case 401:
      window.localStorage.removeItem('user-token')
      router.push('/login')
      // token过期或未传
      //   message = ''
      break
    case 507:
      message = '服务器数据库错误'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
  // 想让错误拦截器的内容继续进入到以后的catch中 而不进入then
  return Promise.reject(error)
})

export default axios
