import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

let a = 1

new Vue({
    el: '#root',
    render: (h) => h(App),
});
