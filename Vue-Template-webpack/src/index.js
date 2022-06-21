import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuex from './store/index';

// 创建一个vue应用，将App组件和封装好的路由放入到vue应用，并挂载到模板页面id为app的元素上。
createApp(App).use(router).use(vuex).mount('#app');
