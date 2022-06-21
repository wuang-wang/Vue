//引入VueRouter
import VueRouter from "vue-router";

export default new VueRouter({
    mode: 'history', // 地址栏不带 *
    routes: [
        {
            path: '/',
            // 设置默认路由
            redirect: '/home'
        },
        {
            path: '/home',
            // 路由懒加载
            component: () => import('../pages/Home.vue'),
            redirect: '/home/news',
            children: [
                {
                    path: 'message',
                    component: () => import('../pages/Message.vue')
                },
                {
                    path: 'news',
                    component: () => import('../pages/News.vue')
                }
            ]
        },
        {
            path: '/about',
            component: () => import('../pages/About.vue')
        }
    ]
});