<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <form @submit.prevent="addStudent" class="mt-5 flex flex-col items-center space-y-4">
      <input v-model="newStudent.name" placeholder="姓名" required class="px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
      <input v-model="newStudent.age" type="number" placeholder="年龄" required class="px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
      <button type="submit" class="px-4 py-2 text-lg border-2 border-transparent focus:outline-none focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
        新增
      </button>
    </form>
    <div class="mt-5">
      <h2 class="text-xl">学生列表</h2>
      <ul class="list-none p-0 mt-2 space-y-2">
        <li v-for="(student, index) in students" :key="student.id" class="flex justify-between items-center">
          {{ student.name }} - {{ student.age }}
          <div class="flex space-x-2">
            <button @click="removeStudent(index)" class="px-2 py-1 border-2 border-transparent focus:outline-none focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
              删除
            </button>
            <button @click="editStudent(student)" class="px-2 py-1 border-2 border-transparent focus:outline-none focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
              修改
            </button>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" v-if="editingStudent">
        <div class="bg-white p-5 rounded w-72 text-center relative">
          <h3 class="text-lg">修改同学</h3>
          <input v-model="editingStudent.name" placeholder="姓名" required class="mt-4 px-3 py-2 border rounded w-full focus:outline-none focus:border-blue-500" />
          <input v-model="editingStudent.age" type="number" placeholder="年龄" required class="mt-4 px-3 py-2 border rounded w-full focus:outline-none focus:border-blue-500" />
          <div class="flex justify-center mt-4 space-x-4">
            <button @click="updateStudent" class="px-4 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
              保存
            </button>
            <button @click="cancelEdit" class="px-4 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
              取消
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const students = ref([
  { id: 1, name: '张三', age: 20 },  
  { id: 2, name: '李四', age: 21 },  
]);

const newStudent = ref({ name: '', age: null });
const editingStudent = ref(null);

function addStudent() {  
  if (!newStudent.value.name || !newStudent.value.age) return;  
  const id = students.value.length + 1;  
  students.value.unshift({ id, ...newStudent.value }); 
  newStudent.value = { name: '', age: null };  
}  

function removeStudent(index) {  
  students.value.splice(index, 1);  
}  

function editStudent(student) {  
  editingStudent.value = { ...student };  
}  

function updateStudent() {  
  if (!editingStudent.value) return;  
  const index = students.value.findIndex(s => s.id === editingStudent.value.id);  
  if (index !== -1) {  
    students.value[index] = { ...editingStudent.value }; 
  }  
  editingStudent.value = null;  
}  

function cancelEdit() {  
  editingStudent.value = null;  
}  

function goToMain() {
  router.push('/main');
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
