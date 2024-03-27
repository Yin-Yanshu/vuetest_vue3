<template>
    <div class="login_container">
        <div class="rigest_form">
            <div class="avatar_box">
                <img src="./assets/logo.png">
            </div>
            <el-form :model="rigestForm" ref="rigest_form" class="login_box">
                <el-form-item prop="input_userid" label="用户id">
                    <el-input v-model="rigestForm.input_userid"></el-input>
                </el-form-item>
                <el-form-item prop="input_name" label="用户名">
                    <el-input v-model="rigestForm.input_name"></el-input>
                </el-form-item>
                <el-form-item prop="input_password" label="密码">
                    <el-input v-model="rigestForm.input_password"></el-input>
                </el-form-item>
                <el-form-item class="button">
                    <el-button @click="userRigest">注册</el-button>
                    <el-button @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const rigestForm = reactive({
    // profile_photo: '',
    input_userid: '',
    input_name: '',
    input_password: '',
});
const userRigest = async () => {
    try {
        const res = await axios.post('/user/register', {
            // profile_photo: rigestForm.profile_photo,
            input_userid: rigestForm.input_userid,
            input_name: rigestForm.input_name,
            input_password: rigestForm.input_password,
        });

        if (res.data.result) {
            router.push('/login');
        } else {
            window.alert('注册失败');
            clearInput();
        }
    } catch (error) {
        console.error('注册请求错误:', error);
    }
};
const clearInput = () => {
    // rigestForm.profile_photo = '';
    rigestForm.input_userid = '';
    rigestForm.input_name = '';
    rigestForm.input_password = '';
};
const router = useRouter();
const back = () => {
    router.push({ path: '/login' });
};

</script>

<style scoped>
.login_container {
    height: 100%;
    background-image: url('./assets/Spectra\ Green\ 24.png');
    background-size: cover;
}

.rigest_form {
    width: 450px;
    height: 350px;
    background-color: rgba(213, 229, 245, 0.8);
    position: relative;
    left: 50%;
    top: 50%;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(206, 221, 238, 0.8);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(233, 232, 232);

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_box {
    position: absolute;
    width: 100%;
    height: 80%;
    padding: 20px;
    padding-bottom: 0%;
    bottom: 0%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.el-form-item {
    display: flex;
    justify-content: space-between;

    :deep(.el-form-item__label) {
        width: 70px;
    }
}

.el-button {
    width: 190px;
    border-radius: 10px;

    :deep(.el-form-item__content) {
        display: flex;
        justify-content: space-around;
    }
}
</style>