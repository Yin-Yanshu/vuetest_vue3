import { RouteRecordRaw } from 'vue-router';
import router from '@/router/index';
import permissionStore from '@/store/permissionStore';

export const initDynamicRouter = () => {
    permissionStore.dispatch('getRouterListAction');
    // 获得的路由数组要进行扁平化再进入router 这一步还未实现以及为什么要这样做
    permissionStore.state.routerList.forEach((item) => {
        router.addRoute(item as RouteRecordRaw);
    });
};

// permissionStore.dispatch('getMenuListAction');
// export const initDynamicRouter = (routes:any) => {
//     const isAdmin = true;
//     const isUser = true;

//     // 生成动态路由
//     const dynamicRoutes: RouteRecordRaw[] = [];

//     permissionStore.state.menuList.forEach((route: any) => {
//         // componentes路径并未填入，设计一个方法拼接组件路径
//         const item = { ...route }; // 克隆原始路由配置

//         // 如果路由配置中有子路由，则递归调用此函数生成子路由
//         if (item.children) {
//             item.children = initDynamicRouter(item.children);
//         }

//         // 根据meta字段进行动态配置
//         if (item.meta) {
//             // 如果需要登录才能访问，但用户未登录，则忽略此路由
//             if (item.meta.requireLogin && !isUser) {
//                 return;
//             }

//             // 如果需要管理员权限，但用户不是管理员，则忽略此路由
//             if (item.meta.requireAdmin && !isAdmin) {
//                 return;
//             }
//         }

//         // 将动态路由添加到结果数组中
//         dynamicRoutes.push(item);
//     });

//     // 将路由项逐个添加到router中
//     dynamicRoutes.forEach((item) => {
//         router.addRoute(item as RouteRecordRaw);
//     });
// };
