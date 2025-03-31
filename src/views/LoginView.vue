<template>
  <AuthLayout slogan="欢迎回来">
    <div class="login-form">
      <h2>登录</h2>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
            type="password"
          />
        </el-form-item>

        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-container">
            <el-input v-model="loginForm.captcha" placeholder="请输入验证码" />
            <img :src="captchaUrl" alt="验证码" class="captcha-img" @click="refreshCaptcha" />
          </div>
        </el-form-item>

        <el-button class="submit-btn" type="primary" @click="handleLogin">登录</el-button>
      </el-form>
      <div class="form-footer">
        <span>还没有账号？</span>
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import axios from 'axios'

const router = useRouter()
const loginFormRef = ref()
const loginForm = ref({
  username: '',
  password: '',
  captcha: '', // 新增验证码字段
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }], // 新增验证码验证规则
}

const captchaUrl = ref('')

// 获取验证码
const getCaptcha = async () => {
  try {
    const response = await axios.get('/api/captcha', {
      responseType: 'blob',
    })
    captchaUrl.value = URL.createObjectURL(response.data)
  } catch (error) {
    console.error('获取验证码失败:', error)
  }
}

// 刷新验证码
const refreshCaptcha = () => {
  getCaptcha()
}

// 组件挂载时获取验证码
onMounted(() => {
  getCaptcha()
})

// 组件卸载时清理 URL 对象
onUnmounted(() => {
  if (captchaUrl.value) {
    URL.revokeObjectURL(captchaUrl.value)
  }
})

const handleLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      // TODO: 实现登录逻辑
      router.push('/')
    }
  })
}
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--el-text-color-primary);
}

.submit-btn {
  width: 100%;
  margin-top: 1rem;
  height: 40px;
}

.form-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--el-text-color-secondary);
}

.form-footer a {
  color: var(--el-color-primary);
  margin-left: 0.5rem;
}

.captcha-container {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.captcha-img {
  height: 32px;
  cursor: pointer;
}
</style>
