import Vue from 'vue'
import App from './App'
import router from './router'

// 引入iconfont资源
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
