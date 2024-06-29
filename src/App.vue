<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  margin: 0 auto;
  max-width: 800px; /* 可选: 限制盒子的最大宽度 */
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 可选: 添加盒子阴影 */
  padding: 20px; /* 可选: 内边距 */
  background-color: white; /* 可选: 背景颜色 */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* 确保 #app 高度为 100% */
}
</style>
