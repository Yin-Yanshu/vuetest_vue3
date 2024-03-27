<template>
    <div>
        <el-table :data="bookInfo.bookInfo">
            <el-table-column prop="id" label="图书id"></el-table-column>
            <el-table-column prop="name" label="书名"></el-table-column>
            <el-table-column prop="auther" label="作者"></el-table-column>
            <el-table-column prop="press" label="出版社"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="state" label="是否在库"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="userLendBook(row.name)">
                        <i class="el-icon-user"></i>
                        <span>借阅</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div>
            <span>书籍搜索</span>
            <el-input v-model="bookSearch" style="width: 200px;margin-left: 10px; margin-right: 40px;"></el-input>
            <el-button @click="userBookSearch" style="width: 150px;margin-right: 20px;">搜索</el-button>
            <el-button @click="getAllBook" style="width: 150px;">返回</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();

const bookInfo = reactive({
    bookInfo: [],
});
const bookSearch = ref('');

const getAllBook = () => {
    axios({
        method: 'post',
        url: '/admin/getallbookinfo',
    })
        .then((res: any) => {
            console.log(res.data.data);
            bookInfo.bookInfo = res.data.data;
        });
};

const userLendBook = (book_name: string) => {
    const user_id = store.state.user_id;
    const user_name = store.state.user_name;
    axios({
        headers: {
            Authorization: store.state.token
        },
        method: 'post',
        url: '/user/book/borrowbook',
        data: {
            user_id: user_id,
            user_name: user_name,
            book_name: book_name,
        }
    })
        .then((res: any) => {
            console.log(res.data);
            if (res.data.result === true) {
                window.alert('借阅成功');
                getAllBook();
            } else {
                window.alert('借阅失败');
            }
        });
};

const userBookSearch = () => {
    axios({
        headers: {
            Authorization: store.state.token
        },
        method: 'post',
        url: '/user/book/getbookinfo',
        data: {
            book_name: bookSearch.value,
        }
    })
        .then((res: any) => {
            console.log(res.data);
            if (res.data.data.length !== 0) {
                bookInfo.bookInfo = res.data.data;
            } else {
                window.alert('查询失败');
            }
        });
    bookSearch.value = '';
};
onMounted(() => {
    getAllBook();
});

</script>

<style scoped>
.el-table {
    border-radius: 20px;
    height: 400px;
    margin-bottom: 10px;
}
</style>