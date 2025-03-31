<template>
  <AuthLayout slogan="加入我们">
    <div class="register-form">
      <h2>注册</h2>
      <el-form :model="registerForm" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" type="email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>

        <el-button type="primary" @click="handleRegister" style="width: 100%"> 立即注册 </el-button>
      </el-form>

      <div class="auth-switch">
        <span>已有账号？</span>
        <router-link to="/login">去登录</router-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/components/AuthLayout.vue'

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleRegister = () => {
  // 注册逻辑
  console.log('注册信息:', registerForm.value)
}
</script>

<style scoped>
.register-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  width: 100%;
}

.register-form h2 {
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
