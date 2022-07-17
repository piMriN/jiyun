<template>
  <div class="login">
    <div class="left">
      <h1>欢迎光临</h1>
    </div>
    <div class="right">
      <h1>欢迎回来</h1>
      <el-divider>
        <p>账号密码登录</p>
      </el-divider>
      <el-form :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="Lock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-button round>登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' }
}
const form = reactive({
  name: ''
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
}
.left {
  width: 68%;
  height: 100%;
  background-color: #6366f1;
  text-align: center;

  h1 {
    color: white;
    font-size: 50px;
    margin-top: 30%;
  }
}
.right {
  width: 32%;
  height: 100%;
  text-align: center;
  h1 {
    margin-top: 50%;
  }
  .el-divider {
    width: 300px;
    margin-left: 20%;
    p {
      color: #d1d8e4;
    }
  }
  .el-form {
    width: 250px;
    margin-left: 125px;
    .el-button {
      width: 250px;
      background-color: #6366f1;
      color: white;
    }
  }
}
</style>
