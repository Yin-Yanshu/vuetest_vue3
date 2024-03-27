<template>
    <el-dialog v-model=dialogFormVisible title="书籍借阅信息">
        <el-table :data="lendinfo" height="400px">
            <el-table-column label="书名" prop="book_name"></el-table-column>
            <el-table-column label="借阅者" prop="user_name"></el-table-column>
            <el-table-column label="借阅时间" prop="time_borrow"></el-table-column>
            <el-table-column label="归还时间" prop="time_return"></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, defineProps } from 'vue';
import axios from 'axios';

const dialogFormVisible = ref(false);
const lendinfo = reactive<any[]>([]);
const props = defineProps({
    book_name: String,
    user_name: String,
});

const open = () => {
    dialogFormVisible.value = true;
};

const GetBookLendInfo_By_bookname = (book_name: string | undefined) => {
    axios({
        method: 'post',
        url: '/admin/getbookinfo',
        data: {
            book_name: book_name,
        }
    })
        .then((res: any) => {
            console.log(res.data.data[0].book_lend);
            lendinfo.push(...res.data.data[0].book_lend);
        });
};

const GetBookLendInfo_By_username = (user_name: string | undefined) => {
    axios({
        method: 'post',
        url: '/admin/getuserinfo',
        data: {
            user_name: user_name,
        },
    })
        .then((res: any) => {
            lendinfo.push(...res.data.data[0].lendinfo);
            lendinfo.forEach((element: any) => {
                element.user_name = user_name;
            });
        });
};

// https://blog.csdn.net/qq_45675616/article/details/126768434
watch(() => props.book_name, () => {
    console.log(props.book_name);
    GetBookLendInfo_By_bookname(props.book_name);
});
watch(() => props.user_name, () => {
    GetBookLendInfo_By_username(props.user_name);
});

// 用于禁用 ESLint规则 原理是告诉 ESLint 不要检查下一行的代码
// eslint-disable-next-line no-undef
defineExpose({
    open,
});
</script>

<style scoped></style>