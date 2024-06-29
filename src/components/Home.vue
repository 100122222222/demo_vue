<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <h1 class="text-2xl">欢迎访问学生管理系统</h1>
    <button @click="goToMain" class="mt-5 px-4 py-2 text-lg border-2 border-transparent focus:outline-none focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
      主页
    </button>
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

</style>
