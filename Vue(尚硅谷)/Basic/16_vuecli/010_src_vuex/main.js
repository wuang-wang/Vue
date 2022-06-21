import Vue from 'vue';
import App from './App.vue';

// 引入vuex
import Vuex from 'vuex';

// 引入store
import store from './store'

Vue.config.productionTip = false;

new Vue({
    el: '#root',
    render: (h) => h(App),
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
});
