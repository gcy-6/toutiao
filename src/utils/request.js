// 封装axios
import axios from 'axios'
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

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 响应成功
  return response.data ? response.data : {}
}, function () {
  // 响应失败
})

export default axios
