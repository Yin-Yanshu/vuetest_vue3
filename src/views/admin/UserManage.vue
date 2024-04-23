<template>
    <div class="container">
        <div class="warp"></div>
        <!--height属性固定table总高度 超过高度则显示滚动条  -->
        <el-table :data="userInfo" height="400">
            <el-table-column prop="id" label="用户id"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column label="操作">
                <!-- https://blog.csdn.net/tg928600774/article/details/81945140  解释slot-scope="scope"的作用-->
                <template #default="{ row }">
                    <el-button @click="GetUserInfo(row.name)">
                        <i class="el-icon-user"></i>
                        <span>借阅信息</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <LendBook ref="child_booklend" :user_name=userName></LendBook>
    </div>
</template>

<script setup lang="ts">
import LendBook from '@/components/LendBook.vue';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
// import {axios} from 'axios';因为使用解构引入导致错误，为什么不能这样引入
// 4.9解答 axios是默认导出export default，默认导出不使用{}
// 具名导出才使用{} 例如export const Axios使用{}导入
import { UserInfo } from '@/interface/user/Message';

const userInfo = reactive<UserInfo[]>([]);
const userName = ref('');

const getAllUserInfo = async () => {
    console.log('getAllUserInfo');
    await axios({
        method: 'post',
        url: '/admin/getalluserinfo',
    })
        .then((res: any) => {
            console.log(res.data.data);
            // 在vue3为什么这里不能直接赋值给userInfo
            userInfo.push(...res.data.data);
        });
};

const child_booklend = ref();
const GetUserInfo = (username: string) => {
    console.log(username);
    userName.value = username;
    child_booklend.value.open();
};

onMounted(() => {
    getAllUserInfo();
});
</script>

<style scoped>
.warp {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: rgb(31, 100, 255);
}

.el-table {
    border-radius: 20px;
}

.el-button {
    border-radius: 10px;
}

/* 修改子组件样式需使用深度监听 */
:deep(.el-dialog) {
    border-radius: 20px;
}
</style>