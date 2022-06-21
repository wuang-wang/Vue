import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/about/index.vue'),
        },
    ],
});

export default router;
