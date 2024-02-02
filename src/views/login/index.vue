<template>
    <div class="login">
        <div class="main">
            <div class="app-header">
                <div class="header-title">账号登录</div>
            </div>
            <div class="app-body">
                <a-form :model="formState" name="normal_login" class="form" @finish="onFinish" @finishFailed="onFinishFailed">
                    <div class="form-item" >
                        <input id="login__username" type="text" name="username" class="form-input" placeholder="Username" required="true"  v-model="formState.username">
                    </div>
                    <div class="form-item" >
                        <input id="login__password" type="password" name="password" class="form-input" placeholder="Password" required="true"  v-model="formState.password">
                    </div>
                    <div class="form-item">
                        <input type="submit" value="Login" class="login-button" />
                    </div>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import { userStore } from '@/stores/user'

    const store = userStore()
    const router = useRouter()

    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';


    interface FormState {
      username: string;
      password: string;
      code: string;
    }
    const formState = reactive<FormState>({
      username: '',
      password: '',
      code: '',
    });

    const onFinish = () => {
        const param = {
          ...formState
        }
        store.userLogin(param).then( res=> {
            if( !res) {
              message.error("数据格式不正确")
              return
            }
            router.push("/")
        })
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

</script>


<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        background-image: url(https://www.bing.com/th?id=OHR.HalbinselJasmund_ZH-CN2110869056_1920x1080.webp&qlt=50);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .main {
        width: 420px;
        margin: 0 auto;
        padding: 40px;
        background-color: #fff;
        box-shadow: 0 1px 5px rgba(45, 47, 51, .1);
    }
    .app-header{
        display: flex;
        justify-content: center;
        .header-title {
            font-size: 24px;
            line-height: 32px;
            color: #000;
        }
    }
    .app-body{
        padding-top: 24px;
        .form-item{
            margin-bottom: 28px;
        }
    }
    .form-input{
        width: 100%;
        background-color: #fff;
        height: 38px;
        line-height: 38px;
        border-radius: 0;
        padding: 1px 15px;
        border: 1px solid #999;
        background-color: #fff;
        display: inline-flex;
    }
    .login-button{
        width: 100%;
        height: 48px;
        line-height: 48px;
        justify-content: center;
        color: #fff;
        border: 1px solid #0d8dff;
        background-color: #0d8dff;
    }
</style>
