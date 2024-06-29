<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 14:34:13
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-24 15:01:55
-->
<template>
  <div class="list_comp">
    <h1>同学列表</h1>
    <div class="tool_tab">
      <button class="add_btn" type="primary" @click="showFlag=true">新增</button>
    </div>
    <ul>
      <li>
        <span class="num">序号</span>
        <span class="study_code">学号</span> 
        <span class="name">姓名</span> 
        <span class="age">年龄</span>
        <div class="operation">操作</div>
      </li>
      <li v-for="(item, index) in userList" :key="item.id">
        <span class="num">{{ index + 1 }}</span>
        <span class="study_code">{{ item.id }}</span> 
        <span class="name">{{ item.userName }}</span> 
        <span class="age">{{ item.age }}</span>
        <div class="operation">
          <button @click="deleteUser(index)">删除</button>
          <button @click="editUser(index)">编辑</button>
          <button @click="getYourName(item.id)">问名字</button>
        </div>
      </li>
    </ul>
    <div class="pop_blank" v-if="showFlag">
      <h3>{{isEdit ? '编辑同学' : '新增同学'}}</h3>
      <div class="blank_body">
        <div class="blank_item">
          <span>学号</span>
          <input type="text" v-model="studyNum">
        </div>
        <div class="blank_item">
          <span>姓名</span>
          <input type="text" v-model="name">
        </div>
        <div class="blank_item">
          <span>年龄</span>
          <input type="text" v-model="age">
        </div>
      </div>
      <div class="footer">
        <button type="primary" @click="submitFn">确定</button>
        <button type="primary" @click="showFlag=flase">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>0
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
const userStore=useUserStore()
const {username,userList} =storeToRefs(userStore)
const {setUserList,setUserName} =userStore
let showFlag=ref(false)
let isEdit = ref(false);
let curIdx = ref(0);
let name=ref("")
let age=ref(0)
let studyNum=ref(0)
// let list = reactive(userList);

const deleteUser = index => {
  userStore.userList.splice(index, 1);
};

const editUser = index => {
  isEdit.value = true;
  curIdx.value = index;
  const item = userStore.userList[index];
  // item.age = 22;
  // todo: 拿到的item信息填入弹窗对应的输入框里
  studyNum.value = item.id;
  name.value = item.userName;
  age.value = item.age;
  showFlag.value = true;
};
const checkList=(code)=>{
  for(let index=0;index<userStore.userList.length;index++){
    const element=userStore.userList[index]
    if(Number(code)===element.id){
      return true
    }
  }
  return false
}
const isNum=(val)=>{
  let exg=/^\d+$/
  if(!exg.test(val)){
    return false
  }
  return true
}
const addNum2name=(name)=>{
  // 将姓名后面追加最新编号
  let total=0
  userStore.userList.map(item=>{
    if(item.userName.indexOf(name) !== -1){
      let tempItem=item
      let tempItemName=tempItem.userName.split('')
      tempItemName.splice(0,name.length)
      let checkItem=isNum(tempItemName.join(''))
      if(tempItemName.length===0 || checkItem){
        total++
      }
    }
  })
  return `${name}${total=== 0 ? '' : total}`
}
const submitFn = () => {
  // 输入内容校验
  let studyNumCheck=isNum(studyNum.value)
  if(!studyNumCheck){
    alert("学号必须是纯数字")
    return
  }
  // 编辑
  let tempName=addNum2name(name.value)
  if(isEdit.value){
    userStore.userList.splice(curIdx.value,1)
    tempName=name.value
  }
  let isStudyNumExist=checkList(studyNum.value)
  if(isStudyNumExist){
    alert("学号已存在")
    return
  }
  // 新增
  userStore.userList.unshift({
    id: studyNum.value,
    userName: tempName,
    age: age.value
  });
  showFlag.value = false;
  // alert(`新增的同学学号是：${studyNum.value};姓名是：${name.value};年龄是：${year.value}`);
}
const getYourName = id => {
  const student = list.find(item => item.id === id);
  alert(student.userName);
};
</script>

<style lang="less" scoped>
.list_comp{
  text-align: left;
}
h1{
  text-align: center;
}
.tool_tab{
  display: flex;
  justify-content: flex-end;
  .add_btn{
    background-color: #efefef;
    margin-right: 24px;
    width: 90px;
  }
}
ul{
  padding-left: 0;
  padding: 0 24px;
  text-align: center;
}
.pop_blank{
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #919191;
  border-radius: 8px;
  width: 50vh;
  height: 40vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 24px;
  display: flex;
  flex-direction: column;
  h3{
    text-align: center;
  }
  .blank_body{
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .blank_item{
    height: 48px;
    font-size: 18px;
    display: flex;
    span{
      // margin-right: 12px;
      width: 48px;
    }
    input{
      height: 24px;
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
  }
  .footer{
    // position: absolute;
    bottom: 24px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button{
      background-color: #df5c5c;
      color: #ffffff;
    }
    & > button:nth-child(1){
      margin-right: 12px;
      background-color: rgb(91, 153, 239);
      color: #ffffff;
    }
  }
}
li{
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  border-bottom: 2px solid #efefef;
  &:nth-child(1){
    background-color: #000000;
    color: #efefef;
  }
  .num{
    width: 18%;
  }
  .name{
    width: 18%;
  }
  .study_code{
    width: 18%;
  }
  .age{
    width: 18%;
  }
  .operation{
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    & > button{
      background-color: rgb(91, 153, 239);
      color: #efefef;
      width: 90px;
    }
  }
}
</style>
