<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="auth-layout">
    <div class="auth-container">
      <div class="left-panel">
        <div class="logo-container">
          <img alt="Logo" class="logo" src="@/assets/logo.svg" />
          <div class="slogan">{{ slogan }}</div>
        </div>
      </div>
      <div class="right-panel">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  slogan: {
    type: String,
    required: true,
  },
})

const isDarkMode = ref(false)

onMounted(() => {
  // 检测系统主题
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    isDarkMode.value = event.matches
  })
})
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background-color: #f8fafc;
}

.auth-container {
  display: flex;
  min-height: 100vh;
  height: 100%; /* 添加这行 */
}

.left-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 2rem;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  position: sticky; /* 添加这行 */
  top: 0;         /* 添加这行 */
  height: 100vh;  /* 添加这行 */
}

.right-panel {
  flex: 1;
  display: flex;
  align-items: flex-start; /* 修改这行，从 center 改为 flex-start */
  justify-content: center;
  background-color: white;
  padding: 2rem;
  min-height: 100vh; /* 添加这行 */
}

/* 响应式设计中修改 */
@media (max-width: 768px) {
  .left-panel {
    position: relative; /* 添加这行 */
    height: auto;      /* 添加这行 */
    min-height: 25vh;
  }
}
.logo-container {
  max-width: 400px;
  text-align: center;
}

.logo {
  max-width: 180px;
  margin-bottom: 1.5rem;
}

.slogan {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
  margin-top: 1rem;
}

/* 暗色模式 */
.dark-mode {
  background-color: #0f172a;
}

.dark-mode .left-panel {
  background-color: #1e293b;
  background-image: none;
}

.dark-mode .right-panel {
  background-color: #0f172a;
}

.dark-mode .slogan {
  color: #f8fafc;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }

  .left-panel {
    padding: 1.5rem 1rem;
    min-height: 25vh;
  }

  .right-panel {
    padding: 1rem;
  }

  .logo {
    max-width: 100px;
  }

  .slogan {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
}
</style>
