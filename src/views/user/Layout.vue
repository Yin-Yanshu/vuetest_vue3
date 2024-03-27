<template>
    <div id="container">
        <el-container>
            <el-aside style="width: 170px;">
                <div class="title">图书管理系统</div>
                <el-menu class="nav_menu" @select="pageRouter">
                    <el-menu-item class="nav_menu_item" index="bookmanage">个人信息</el-menu-item>
                    <el-menu-item class="nav_menu_item" index="booklend">图书查询</el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="display: flex;justify-content: flex-end;">
                    <div class="header_user_name">{{ userName }}</div>
                    <el-button class="title_button" @click="quitLogin">退出登录</el-button>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userName = ref(store.state.user_id);
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
        console.log(index);
        router.push({ path: '/user/bookmanage' }).catch(() => {
            // 忽略连续路由相同路径导致的错误
        });
    } else if (index === 'booklend') {
        console.log(index);
        router.push({ path: '/user/booklend' }).catch(() => {
            // 忽略连续路由相同路径导致的错误
        });
    }
};
</script>

<style scoped>
.el-header {
    background-color: rgb(255, 255, 255);
    box-shadow: 0, 10px, ;
}

.title {
    padding-top: 10px;
    font-size: 24px;
}

.header_user_name {
    margin-left: 20px;
    margin-top: 20px;
}

.title_button {
    margin-left: 20px;
    margin-top: 10px;
    border-radius: 10px;
    background: rgb(31, 100, 255);
    color: rgb(255, 255, 255);
    width: 150px;
}

#container {
    height: 100%;

    .el-container {
        height: 100%;

        .el-aside {

            .nav_menu {
                padding: 10px;

                .nav_menu_item {
                    border-radius: 10px;
                    font-size: 16px;
                }
            }
        }

        .el-main {
            padding: 20px;
            height: 100%;
            background: rgb(245, 245, 245, 0.96);
        }
    }
}
</style>