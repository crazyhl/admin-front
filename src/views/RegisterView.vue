<script lang="ts" setup>
import { ref } from 'vue'
import { register } from '@/request/auth.ts'
import { useRoute, useRouter } from 'vue-router'
import { captcha } from '@/request/captcha.ts'
import AuthBase from '@/components/AuthBase.vue'
import type { RegisterForm } from '@/request/interface/registerForm.ts'

// 初始化登录表单数据，默认邮箱和密码用于测试环境
const registerForm = ref<RegisterForm>({
  email: 'crazyhl@163.com', // 邮箱
  password: '123456789', // 密码
  confirmPassword: '123456789', // 密码
  device: navigator.userAgent, // 浏览器 ua 用户记录部分用户信息，这个是 laravel 用的
  captcha: '', // 验证码
  key: '',
})
const captchaUrl = ref<string>('')

refreshCaptcha()

function refreshCaptcha() {
  captcha()
    .then((res) => {
      captchaUrl.value = res.data.img
      registerForm.value.key = res.data.key
    })
    .catch((err) => {})
}

const route = useRoute()
const router = useRouter()
const handleLogin = () => {
  // 处理登录逻辑
  register(registerForm.value).then((resp) => {
    router.push({ name: 'home' })
  })
}
</script>

<template>
  <AuthBase>
    <el-form :model="registerForm" class="login-form" label-position="top">
      <h2 class="form-title">用户登录</h2>

      <el-form-item label="邮箱">
        <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="密码">
        <el-input
          v-model="registerForm.password"
          placeholder="请输入密码"
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          v-model="registerForm.password"
          placeholder="请再次输入密码"
          show-password
          type="password"
        />
      </el-form-item>
      <!-- 保持原有结构，在密码表单项后添加 -->
      <el-form-item label="验证码" prop="captcha">
        <div class="captcha-container">
          <el-input
            v-model="registerForm.captcha"
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
  </AuthBase>
</template>

<style scoped>
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
</style>
