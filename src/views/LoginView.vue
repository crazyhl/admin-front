<template>
  <AuthLayout slogan="欢迎回来">
    <div class="login-form">
      <h2>登录</h2>
      <el-form :model="loginForm" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>

        <el-button type="primary" @click="handleLogin" style="width: 100%"> 登录 </el-button>
      </el-form>

      <div class="auth-switch">
        <span>没有账号？</span>
        <router-link to="/register">注册</router-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/components/AuthLayout.vue'

const loginForm = ref({
  username: '',
  password: '',
})

const handleLogin = () => {
  // 登录逻辑
}
</script>

<style scoped>
.login-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  width: 100%;
}

.login-form h2 {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.el-form-item {
  margin-bottom: 25px;
}

.el-input {
  font-size: 16px;
}

.el-button {
  height: 48px;
  font-size: 16px;
  margin-top: 10px;
}

.auth-switch {
  margin-top: 20px;
  font-size: 14px;
}
</style>

<style scoped>
.logo {
  max-width: 150px;
  margin-bottom: 1rem;
}

.slogan {
  color: inherit;
}
</style>
