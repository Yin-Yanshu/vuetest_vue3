<template>
    <div class="container">
        <div class="warp"></div>

        <el-table :data="bookInfo">
            <el-table-column prop="id" label="图书id"></el-table-column>
            <el-table-column prop="auther" label="作者"></el-table-column>
            <el-table-column prop="name" label="书名"></el-table-column>
            <el-table-column prop="press" label="出版社"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="borrowing_number" label="借阅次数"></el-table-column>
            <el-table-column prop="state" label="是否在库"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <span>{{ scope.row.auther }}</span>
                    <el-button @click="getBookLendInfo(scope.row.name)">借阅信息
                    </el-button>
                    <!-- <el-button @click="deleteBookInfo(scope.row.name)" v-if="buttonType">删除图书
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!-- 传递页面参数实现后端分页 -->
        <el-button @click="addPageNum">页数+1</el-button>
        <el-button @click="subPageNum">页数-1</el-button>
        <el-button @click="addBookInfo">添加图书</el-button>

        <!-- element分页组件内置函数分割数据实现前端分页 -->
        <!-- <el-pagination></el-pagination>   v-if="showbutton"-->

        <!--子传父    父组件监听子组件GetChildInfo事件，和响应函数GetChildInfo  -->
        <AddBook ref="child_addbook" @childsend="getChildInfo"></AddBook>
        <!--父传子 父组件向子组件对应属性传递数据  子组件可直接调用props内数据  -->
        <LendBook ref="child_booklend" :book_name=bookName></LendBook>
        <DeleteBook ref="child_bookdelete" :book_name=bookName></DeleteBook>

    </div>
</template>

<script setup lang="ts">
import AddBook from '@/components/AddBook.vue';
import LendBook from '@/components/LendBook.vue';
import DeleteBook from '@/components/DeleteBook.vue';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { BookInfo } from '@/interface/admin/Message';

const bookInfo = reactive<BookInfo[]>([]);
const pageNum = ref(0);
const pageSize = ref(5);
const bookName = ref('');
const buttonType = ref(true);

const getBookInfo = (pageNum: number, pageSize: number) => {
    axios({
        method: 'get',
        url: '/admin/getuserinfobynum',
        params: {
            page_num: pageNum,
            page_size: pageSize,
        },
    })
        .then((res: any) => {
            // 清空数组将length设为0
            bookInfo.length = 0;
            bookInfo.push(...res.data.data);
            console.log(bookInfo);
            // bookInfo.push(res.data.data); 要使用解构赋值
        });
};

// 检查书籍借阅信息
const child_booklend = ref();
const getBookLendInfo = (bookname: any) => {
    bookName.value = bookname;
    console.log(bookName.value);
    child_booklend.value.open();
};

// 添加图书
const child_addbook = ref();
const addBookInfo = () => {
    child_addbook.value.open();
};
const getChildInfo = (message: BookInfo) => {
    bookInfo.push(message);
};

// 页数+1
const addPageNum = () => {
    pageNum.value = pageNum.value + 1;
    getBookInfo(pageNum.value, pageSize.value);
};

// 页数-1
const subPageNum = () => {
    pageNum.value = pageNum.value - 1;
    getBookInfo(pageNum.value, pageSize.value);
};

// 删除图书
const child_bookdelete = ref();
const deleteBookInfo = (bookname: string) => {
    bookName.value = bookname;
    console.log(bookName.value);
    child_bookdelete.value.open();
};
// const getDeleteInfo = (data: any) => {
//     if (data.result === true) {
//         getBookInfo(pageNum.value, pageSize.value);
//     }
// };

onMounted(() => {
    getBookInfo(0, 5);
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
    height: 400;
    border: 5px solid var(--el-aside-border-color);
}

.el-button {
    border-radius: 10px;
    width: 100px;
}

:deep(.el-dialog) {
    border-radius: 20px;
}
</style>