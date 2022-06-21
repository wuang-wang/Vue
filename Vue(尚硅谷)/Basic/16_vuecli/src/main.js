import Vue from 'vue';
import App from './App.vue';

// 引入路由
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false;
// 使用路由
Vue.use(VueRouter)

new Vue({
    el: '#root',
    render: (h) => h(App),
    router
});
