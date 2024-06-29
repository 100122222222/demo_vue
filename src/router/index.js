import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Main from "../components/Main.vue";
const routes=[
    {
        path:'/',
        redirect:'/home'//路由重定向
    },
    {
        path:'/home',
        name:'home',
        component:Home
    },
    {
        path:'/main',
        name:'main',
        component:Main
    },
]
const router=createRouter({
    history:createWebHistory(),//采用html5 路由模式
    routes
})

//路由对象暴露出去
export default router