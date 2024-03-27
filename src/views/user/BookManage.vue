<template>
    <div id="container">
        <el-row>
            <el-col :span="12">
                <label>当前借阅</label>
                <el-table class="table" :data="bookInfo.bookInfo">
                    <el-table-column prop="book_name" label="书名"></el-table-column>
                    <el-table-column prop="time_borrow" label="借阅时间"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button @click="userReturnBook(row.book_name)">
                                <i class="el-icon-user"></i>
                                <span>归还书籍</span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="12">
                <label>全部借阅</label>
                <el-table class="table" :data="bookInfoAll.bookInfoAll">
                    <el-table-column prop="book_name" label="书名"></el-table-column>
                    <el-table-column prop="time_borrow" label="借阅时间"></el-table-column>
                    <el-table-column prop="time_return" label="归还时间"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();

const bookInfo = reactive({
    bookInfo: [],
});
const bookInfoAll = reactive({
    bookInfoAll: [],
});

const getUserBookInfoAll = () => {
    // 使用自定义axios，封装token到header中
    axios({
        headers: {
            Authorization: store.state.token
        },
        method: 'post',
        url: '/user/book/getuserbooklendall',
    })
        .then((res: any) => {
            console.log(res.data);
            // 给data中的数组[]到底以什么方式赋值 this.book_info.push(res.data.data)不也是给数组赋值吗
            bookInfoAll.bookInfoAll = res.data.data;
        });
};

const getUserBookInfo = () => {
    axios({
        headers: {
            Authorization: store.state.token
        },
        method: 'post',
        url: '/user/book/getuserbooklendnow',
    })
        .then((res: any) => {
            console.log(res.data);
            // 给data中的数组[]到底以什么方式赋值 this.book_info.push(res.data.data)不也是给数组赋值吗
            bookInfo.bookInfo = res.data.data;
        });
};

const userReturnBook = (book_name: string) => {
    const user_id = store.state.user_id;
    const user_name = store.state.user_name;
    axios({
        headers: {
            Authorization: store.state.token
        },
        method: 'post',
        url: '/user/book/returnbook',
        data: {
            user_id: user_id,
            user_name: user_name,
            book_name: book_name,
        }
    })
        .then((res: any) => {
            console.log(res.data);
            getUserBookInfo();
            getUserBookInfoAll();
        });
};

onMounted(() => {
    getUserBookInfo();
    getUserBookInfoAll();
});
</script>

<style scoped>
#container {
    background-color: rgb(245, 245, 245, 0.96);
}

.table {
    border-radius: 20px;
    width: 600px;
    height: 500px;
}
</style>