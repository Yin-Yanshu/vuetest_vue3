<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="./assets/logo.png">
            </div>
            <el-form class="login_form" :model="forms" :rules="loginRule" ref="login_forms" label-width="auto">
                <el-form-item prop="input_userid" label="用户名">
                    <el-input class="login_input" v-model="forms.input_userid" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="input_password" label="密码">
                    <el-input class="login_input" v-model="forms.input_password" type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="身份">
                    <el-radio-group class="radio" v-model="radio"
                        style="display: flex;justify-content: center;padding-top: 10px;">
                        <el-radio value=1>用户
                        </el-radio>
                        <el-radio value=2 style="margin-left: 60px;">管理员
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="button_container">
                    <el-button class="button" @click="pageLogin" icon="el-icon-user">登录
                    </el-button>
                    <el-button class="button" @click="pageRigest" icon="el-icon-user-solid">注册
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

const router = useRouter();
const store = useStore();

const forms = reactive({
    input_userid: '',
    input_password: '',
    login_result: ''
});

const radio = ref();
const loginRule = reactive({
    input_userid: [{ required: true, message: '用户名必填', trigger: 'change' }],
    input_password: [{ required: true, message: '密码必填', trigger: 'blur' },
    { min: 2, max: 10, message: '密码长度不合规', trigger: 'blur' }]
});

const handleLogin = async (url: string) => {
    try {
        const res = await axios.post(url, {
            user_id: forms.input_userid,
            password: forms.input_password,
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('登录请求错误:', error);
        throw new Error('登录请求错误');
    }
};
const login_forms = ref();
const pageLogin = async () => {
    await login_forms.value.validate(async (valid: boolean) => {
        if (valid === true) {
            const loginUrl = radio.value === '1' ? '/user/login' : '/admin/login';

            try {
                const res = await handleLogin(loginUrl);
                const playload = {
                    user_id: forms.input_userid,
                    token: res.token || null,
                };
                if (res.data === true && radio.value === '1') {
                    store.dispatch('updateUser', { playload })
                    router.push({ path: '/user' }).catch(() => {
                        // 忽略连续路由相同路径导致的错误
                    });
                } else if (res.data === true && radio.value === '2') {
                    console.log(playload);
                    store.dispatch('updateAdmin', { playload })
                    router.push({ path: '/admin' }).catch(() => {
                        // 忽略连续路由相同路径导致的错误
                    });
                } else {
                    window.alert('登录失败');
                    console.log('登录失败');
                }
            } catch (error) {
                window.alert('登录失败errre');
                console.log('登录失败error');
            }
        } else {
            console.log('校验失败');
        }
    });
};

const pageRigest = () => {
    router.push('/rigest').catch(() => {
        // 忽略连续路由相同路径导致的错误
    });
};
</script>

<style lang="less" scoped>
.login_container {
    height: 100%;
    background-image: url('./assets/Spectra\ Green\ 24.png');
    background-size: cover;
}

.login_box {
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

.login_form {
    position: absolute;
    width: 100%;
    padding: 20px;
    padding-top: 60px;
    bottom: 0px;
    box-sizing: border-box;
}

.button {
    width: 190px;
    border-radius: 10px;
}

:deep(.el-form-item__content) {
    margin: auto;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
}
</style>
