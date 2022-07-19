<template>
  <div class="login-container">
    <div class="left">
      <span>欢迎光临</span>
    </div>
    <div class="right">
      <h2>欢迎回来</h2>
      <div class="a">
        <span class="line">-----</span>
        <span>账号密码登录</span>
        <span class="line">-----</span>
      </div>
      <el-form
        ref="LoginForm"
        :rules="loginFormRules"
        :model="loginForm"
        label-position="right"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            prefix-icon="user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginForm.password"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const LoginForm = ref('')
const loginFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const loginForm = reactive({
  username: 'admin',
  password: ''
})

const handleLoginSubmit = () => {
  LoginForm.value.validate(async (valid) => {
    if (!valid) return
    await store.dispatch('user/login', loginForm)
    await store.dispatch('user/userInfo')
    router.push('/')
  })
}
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    width: 66%;
    height: 100%;
    background-color: #6366f1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
      font-weight: 700;
      font-size: 3rem;
      line-height: 1;
      color: white;
    }
  }
  .right {
    width: 34%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

    h2 {
      font-weight: 700;
      font-size: 1.875rem;
      line-height: 2.25rem;
      margin-bottom: 20px;
    }
    span {
      --tw-text-opacity: 1;
      color: rgba(209, 213, 219, var(--tw-text-opacity));
    }
    .el-button {
      width: 100%;
      background-color: #9197f4;
      border-radius: 50px;
      margin-top: 20px;
    }
  }
}
</style>
