<template>
  <div class="login-container">
    <!-- 左侧内容 -->
    <div class="left-panel">
      <div class="branding">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" />
        <h2 class="slogan">Your Slogan Here</h2>
      </div>
    </div>

    <!-- 右侧表单 -->
    <div class="right-panel">
      <el-form :model="loginForm" class="login-form" label-position="top">
        <h2 class="form-title">用户登录</h2>

        <el-form-item label="邮箱">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
            type="password"
          />
        </el-form-item>

        <el-button class="login-btn" type="primary" @click="handleLogin"> 立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { LoginForm } from '@/request/interface/loginForm.ts'
import { login } from '@/request/auth.ts'

const loginForm = ref<LoginForm>({
  email: '',
  password: '',
  device: navigator.userAgent,
})

const handleLogin = () => {
  // 处理登录逻辑
  login(loginForm.value).then((response) => {
    console.log(response)
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  background-color: #fff;
}

.left-panel {
  flex: 1;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s;
}

.branding {
  text-align: center;
  max-width: 80%;
}

.logo {
  max-width: 200px;
  margin-bottom: 20px;
}

.slogan {
  color: #666;
  font-weight: normal;
}

.right-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-form {
  width: 80%;
  max-width: 400px;
}

.form-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.login-btn {
  width: 100%;
  margin-top: 20px;
}

/* 响应式处理 */
@media (max-width: 768px) {
  .left-panel {
    display: none;
  }

  .right-panel {
    flex: 0 0 100%;
    padding: 20px 15px;
  }

  .login-form {
    width: 100%;
    max-width: 100%;
  }
}
</style>
