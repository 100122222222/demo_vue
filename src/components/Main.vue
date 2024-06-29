<template>
  <div class="container">
    <form @submit.prevent="addStudent">  
      <input v-model="newStudent.name" placeholder="姓名" required>  
      <input v-model="newStudent.age" type="number" placeholder="年龄" required>  
      <button type="submit">新增</button>  
    </form>
    <div class="box">
      <h2>学生列表</h2>
      <ul>  
        <li v-for="(student, index) in students" :key="student.id">  
          {{ student.name }} - {{ student.age }}  
          <button @click="removeStudent(index)">删除</button>  
          <button @click="editStudent(student)">修改</button>  
        </li>  
      </ul> 
    </div> 
    <transition name="fade">
      <div class="modal" v-if="editingStudent">  
        <div class="modal-content">
          <h3>修改同学</h3>  
          <input v-model="editingStudent.name" placeholder="姓名" required>  
          <input v-model="editingStudent.age" type="number" placeholder="年龄" required>  
          <div class="modal-buttons">
            <button @click="updateStudent">保存</button>  
            <button @click="cancelEdit">取消</button>
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
  // 初始同学列表  
  { id: 1, name: '张三', age: 20 },  
  { id: 2, name: '李四', age: 21 },  
  // ...
]);

const newStudent = ref({ name: '', age: null });
const editingStudent = ref(null);

function addStudent() {  
  if (!newStudent.value.name || !newStudent.value.age) return;  
  const id = students.value.length + 1; // 假设ID是自增的  
  students.value.unshift({ id, ...newStudent.value }); // 新增的同学放到最上面
  newStudent.value = { name: '', age: null }; // 重置表单  
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
    students.value[index] = { ...editingStudent.value }; // 仅更新学生信息，不改变位置
  }  
  editingStudent.value = null; // 结束编辑状态  
}  

function cancelEdit() {  
  editingStudent.value = null; // 取消编辑状态  
}  

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

h2 {
  font-size: 1.5em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

button {
  margin-left: 10px;
}

form {
  margin-top: 20px;
}

input {
  margin-right: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  position: relative;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.modal-buttons button {
  margin: 0 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
