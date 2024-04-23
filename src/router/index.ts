import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store/index';

const routes: Array<RouteRecordRaw> = [
    {
        // 第一次进入http://localhost:8080/时，路由没有匹配到路径，则没有任何显示
        // redirect将/重定向到/login路径
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'LogIn',
        component: () => import('@/Login.vue'),
    },
    {
        path: '/rigest',
        name: 'Rigest',
        component: () => import('@/Rigest.vue'),
    },
    {
        path: '/user',
        name: 'UserLayout',
        component: () => import('@/views/user/Layout.vue'),
        meta: {
            requireLogin: true
        },
        children: [
            {
                path: 'bookmanage',
                name: 'BookManage',
                component: () => import('@/views/user/BookManage.vue'),
                meta: {
                    requireLogin: true
                },
            },
            {
                path: 'booklend',
                name: 'BookLend',
                component: () => import('@/views/user/BookLend.vue'),
                meta: {
                    requireLogin: true
                },
            }
        ]
    },
    {
        // /表示总根路径出发，访问/admin路径
        path: '/admin',
        name: 'AdminLayout',
        component: () => import('@/views/admin/Layout.vue'),
        meta: {
            admin: true,
        },
        children: [
            {
                // 为什么内部path不加 /
                // 不加/表示相对路径
                path: 'bookmanage',
                name: 'BookManage',
                component: () => import('@/views/admin/BookManage.vue'),
                meta: {
                    admin: true,
                },
            },
            {
                path: 'usermanage',
                name: 'UserManage',
                component: () => import('@/views/admin/UserManage.vue'),
                meta: {
                    admin: true,
                },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// https://blog.csdn.net/weixin_42821697/article/details/122057670
// 为什么router引入vuex是从文件引入，不是vuex引入，猜测是生命周期的原因
router.beforeEach((to: any, from: any, next: any) => {
    if (to.meta.requireLogin) {
        if (store.state.token !== null) {
            next();
        } else {
            window.alert('请先登录');
            console.log('请先登录');
            next({ path: '/' });
        }
    } else {
        next()
    }
    if (to.meta.admin) {
        if (store.state.user_id !== null) {
            next();
        } else {
            window.alert('admin请先登录');
            console.log('admin请先登录');
            next({ path: '/login' });
        }
    } else {
        next()
    }
});

export default router;
