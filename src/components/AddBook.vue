<template>
    <el-dialog v-model="dialogFormVisible" title="添加图书单">
        <el-form :model="bookinfo" :rules="addRules" ref="forms">
            <el-form-item prop="auther">
                <label>作者</label>
                <el-input v-model="bookinfo.auther"></el-input>
            </el-form-item>

            <el-form-item prop="book_name">
                <label>书名</label>
                <el-input v-model="bookinfo.book_name"></el-input>
            </el-form-item>

            <el-form-item prop="press">
                <label>出版社</label>
                <el-input v-model="bookinfo.press"></el-input>
            </el-form-item>

            <el-form-item prop="number">
                <label>数量</label>
                <el-input v-model="bookinfo.number"></el-input>
            </el-form-item>

            <el-form-item prop="type">
                <label>类型</label>
                <el-input v-model="bookinfo.type"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="AddBookInfo('forms')">
                    <i class="el-icon-user"></i>添加书籍
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { axios } from 'axios';

const dialogFormVisible = ref(false);
const bookinfo = reactive({
    auther: '',
    book_name: '',
    press: '',
    number: '',
    type: '',
    result: '',
});
const addRules = reactive({
    auther: [{ required: true, message: '作者必填', trigger: 'change' }],
    book_name: [{ required: true, message: '书名必填', trigger: 'change' }],
    press: [{ required: true, message: '出版社必填', trigger: 'change' }],
    number: [{ required: true, message: '数量必填', trigger: 'change' }],
    type: [{ required: true, message: '类型必填', trigger: 'change' }],
});

const forms = ref();
const AddBookInfo = (form: any) => {
    form.validate((result: any) => {
        if (result === true) {
            // 全局使用的属性加上$，加强命名规范，防止和局部属性名发生冲突
            axios({
                method: 'post',
                url: '/admin/addbookinfo',
                data: {
                    auther: bookinfo.auther,
                    book_name: bookinfo.book_name,
                    press: bookinfo.press,
                    number: bookinfo.number,
                    type: bookinfo.type,
                }
            })
                .then((res: any) => {
                    console.log(res);
                    bookinfo.result = res.data.data;
                    if (bookinfo.result === 'true') {
                        alert('添加成功');
                        // this.SendBookInfo_Tofather();
                        dialogFormVisible.value = false;
                    } else {
                        alert('添加失败');
                        ClearInput();
                    }
                });
        } else {
            alert('校验失败');
            ClearInput();
        }
    });
};

const open = () => { // 在父组件调用打开
    dialogFormVisible.value = true;
};

const ClearInput = () => {
    bookinfo.auther = '';
    bookinfo.book_name = '';
    bookinfo.press = '';
    bookinfo.number = '';
    bookinfo.type = '';
};
// eslint-disable-next-line no-undef
defineExpose({
    open,
});
</script>

<style scoped></style>