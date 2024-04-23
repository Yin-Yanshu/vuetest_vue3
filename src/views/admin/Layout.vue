<template>
    <el-container>
        <el-aside style="width: 170px;">
            <div class="title">图书管理系统</div>
            <div>
                <el-menu class="nav_menu" @select="pageRouter">
                    <el-menu-item class="nav_menu_item" index="index">
                        <i class="el-icon-menu"></i>首页
                    </el-menu-item>
                    <el-menu-item class="nav_menu_item" index="usermanage">
                        <i class="el-icon-s-custom"></i>用户管理
                    </el-menu-item>
                    <el-menu-item class="nav_menu_item" index="bookmanage">
                        <i class="el-icon-notebook-1"></i>图书管理
                    </el-menu-item>
                </el-menu>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <span class="title_span">{{ adminName }}</span>
                <el-button class="title_button" @click="quitLogin">退出登录</el-button>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const adminName = ref('admin');
const store = useStore();
const router = useRouter();

const quitLogin = () => {
    console.log(store.state.user_id);
    store.commit('Update_user_id', '');
    store.commit('Update_user_name', '');
    store.commit('Update_token', '');
    router.push({ path: '/login' }).catch(() => {
        // 忽略连续路由相同路径导致的错误
    });
};

const pageRouter = (index: string) => {
    if (index === 'bookmanage') {
        router.push({ path: '/admin/bookmanage' }).catch(() => {
            // 忽略连续路由相同路径导致的错误
        });
    } else if (index === 'usermanage') {
        router.push({ path: '/admin/usermanage' }).catch(() => {
            // 忽略连续路由相同路径导致的错误
        });
    }
};

onMounted(() => {
    pageRouter('bookmanage');
});
</script>

<style scoped>
.el-container {
    height: 100%;
    background-color: rgb(245, 245, 245, 0.96);

    /* 4.10属性值无效是什么原因 */
    /* border-right: 5px, solid; */
    /* .el-aside {
        border-right: 5px solid var(--el-aside-border-color);

        .title {
            padding: 10px;
            padding-top: 15px;
            font-size: 24px;
        }
    } */
    .el-aside {
        background-color: rgb(255, 255, 255);
        height: 100%;
        border-right: 5px solid var(--el-aside-border-color);

        .title {
            padding: 10px;
            padding-top: 15px;
            font-size: 24px;
        }

        .nav_menu {
            padding: 10px;

            .nav_menu_item {
                border-radius: 10px;
                font-size: 16px;
            }

            .nav_menu_item:active {
                background: rgb(233, 242, 255);
            }
        }
    }

    .el-header {
        background-color: rgb(255, 255, 255);
        /* 4.10浏览器提示属性值无效 */
        box-shadow: 0, 10px, 10px;
        display: flex;
        justify-content: flex-end;
        border: 5px, solid;

        .title_span {
            margin-top: 10px;
            padding-top: 10px;
            margin-left: 20px;
        }

        .title_button {
            margin-left: 20px;
            margin-top: 10px;
            border-radius: 10px;
            background: rgb(31, 100, 255);
            color: rgb(255, 255, 255);
            width: 150px;
        }
    }

    .el-main {
        margin: 0%;
        padding: 10px;
    }
}
</style>