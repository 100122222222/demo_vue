<template>
  <div class="container">
    <h1>欢迎访问学生管理系统</h1>
    <button @click="goToMain">主页</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToMain() {
  router.push('/main');
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

h1 {
  font-size: 2em;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
}
</style>
