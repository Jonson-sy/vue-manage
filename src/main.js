import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
/* 导入字体图标 */
import 'assets/fonts/iconfont.css'

import axios from 'axios'



//配置请求的根路径
axios.defaults.baseURL = "http://118.31.171.210:8801/api/private/v1/"
//除登录请求以外的其他API请求必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
