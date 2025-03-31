<template>
  <AuthLayout slogan="加入我们">
    <div class="register-form">
      <h2>注册</h2>
      <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            show-password
            type="password"
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
        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-container">
            <el-input v-model="registerForm.captcha" placeholder="请输入验证码" />
            <img :src="captchaUrl" alt="验证码" class="captcha-img" @click="refreshCaptcha" />
          </div>
        </el-form-item>
        <el-button class="submit-btn" type="primary" @click="handleRegister">注册</el-button>
      </el-form>
      <div class="form-footer">
        <span>已有账号？</span>
        <router-link to="/login">立即登录</router-link>
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
const registerFormRef = ref()
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  captcha: '',
})

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  confirmPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

// 刷新验证码
const captchaUrl = ref('')

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

const refreshCaptcha = () => {
  getCaptcha()
}

onMounted(() => {
  getCaptcha()
})

onUnmounted(() => {
  if (captchaUrl.value) {
    URL.revokeObjectURL(captchaUrl.value)
  }
})

const handleRegister = () => {
  registerFormRef.value?.validate((valid) => {
    if (valid) {
      // TODO: 实现注册逻辑
      router.push('/login')
    }
  })
}
</script>

<style scoped>
.register-form {
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
