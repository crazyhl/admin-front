<script lang="ts" setup></script>

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
      <slot></slot>
    </div>
  </div>
</template>

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
