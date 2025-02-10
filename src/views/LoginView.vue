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
        <!-- 保持原有结构，在密码表单项后添加 -->
        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-container">
            <el-input
              v-model="loginForm.captcha"
              class="captcha-input"
              placeholder="请输入验证码"
            />
            <div class="captcha-image" @click="refreshCaptcha">
              <img v-if="captchaUrl" :src="captchaUrl" alt="验证码" />
              <span v-else>loading captcha...</span>
            </div>
          </div>
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
import { useRoute, useRouter } from 'vue-router'
import { captcha } from '@/request/captcha.ts'

// 初始化登录表单数据，默认邮箱和密码用于测试环境
const loginForm = ref<LoginForm>({
  email: 'crazyhl@163.com', // 邮箱
  password: '123456789', // 密码
  device: navigator.userAgent, // 浏览器 ua 用户记录部分用户信息，这个是 laravel 用的
  captcha: '', // 验证码
})
const captchaUrl = ref<string>('')

refreshCaptcha()

function refreshCaptcha() {
  captcha()
    .then((res) => {
      captchaUrl.value = res.data.src
    })
    .catch((err) => {})
}

const route = useRoute()
const router = useRouter()
const handleLogin = () => {
  // 处理登录逻辑
  login(loginForm.value).then(() => {
    const redirectTo = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.push(redirectTo)
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

/* 添加验证码样式 */
.captcha-container {
  display: flex;
  gap: 10px;
  width: 100%;
}

.captcha-input {
  flex: 1;
}

.captcha-image {
  height: 40px;
  width: 126px;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 2px;

  img {
    height: 100%;
    vertical-align: middle;
  }

  &:hover {
    border-color: #409eff;
  }
}

.el-input {
  height: 40px;
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
