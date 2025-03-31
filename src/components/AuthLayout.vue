<template>
  <div class="auth-layout" :class="{ 'dark-mode': isDarkMode }">
    <div class="auth-container">
      <div class="left-panel">
        <div class="logo-container">
          <img src="@/assets/logo.svg" alt="Logo" class="logo" />
          <h2 class="slogan">{{ slogan }}</h2>
        </div>
      </div>
      <div class="right-panel">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  slogan: {
    type: String,
    required: true,
  },
})

const isDarkMode = ref(false)

const checkDarkMode = () => {
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}

onMounted(() => {
  checkDarkMode()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode)
})
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  transition: all 0.3s ease;
}

.auth-container {
  display: flex;
  min-height: 100vh;
}

.left-panel,
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

.left-panel {
  background-color: #f5f7fa;
  align-items: center;
  text-align: center;
}

.right-panel {
  background-color: white;
}

.dark-mode .left-panel {
  background-color: #1a1a2e;
}

.dark-mode .right-panel {
  background-color: #16213e;
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }

  .left-panel {
    padding: 1rem;
    min-height: 30vh;
  }
}

.logo {
  max-width: 150px;
  margin-bottom: 1rem;
}

.slogan {
  color: inherit;
}
</style>
