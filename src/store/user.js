import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  let username = ref('张三');
  let userList=reactive([
    {
      id: 220812022,
      userName: '刘淑文',
      age: 18
    },
    {
      id: 220812008,
      userName: '蔡欣怡',
      age: 18
    },
    {
      id: 220812030,
      userName: '龙依',
      age: 18
    }
  ]);
  
  const setUserName = (newName) => {
    username.value = newName;
  };
  const setUserList = (newList) => {
    userList = newList;
  };

  return {
    username,
    userList,
    setUserName,
    setUserList
  };
});