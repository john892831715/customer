import Vue from 'vue'
import VueRouter from 'vue-router'
//登录后管理的页面
import Manager from '../pages/manager/Index'
import Home from '../pages/manager/Home'
import Order from '../pages/manager/Order'
import User from '../pages/manager/User'

//登录页面
import Login from '../pages/Login'
import List from '../pages/List'
import Confirm from '../pages/Confirm'
import AddAddress from '../pages/AddAddress'
import UpdateAddress from '../pages/UpdateAddress'


import { getToken } from '../utils/auth'
import { Toast } from 'vant'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path:"/manager",
    redirect:"/manager/home"
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
    beforeEnter: (to, from, next) => {  
      //属于路由自己的拦截器
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/info',token)
        .then(()=>{
          // 当获取万用户信息之后才允许跳转
          next();
        })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({path:'/'})
      }
    },
    children:[{
      path:'home',
      component:Home,
    },{
      path:'order',
      component:Order,
    },{
      path:'user',
      component:User,
    }]
  },
  {
    path: '/',
    name: 'login',
    component:Login
  },
  {
    path:'/list',
    name: 'list',
    component:List,
    beforeEnter: (to, from, next) => {  
      //属于路由自己的拦截器
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/info',token)
        .then(()=>{
          // 当获取万用户信息之后才允许跳转
          next();
        })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({path:'/'})
      }
    }
  },
  {
    path:'/confirm',
    name: 'confirm',
    component:Confirm,
    beforeEnter: (to, from, next) => {  
      //属于路由自己的拦截器
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/info',token)
        .then(()=>{
          // 当获取万用户信息之后才允许跳转
          next();
        })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({path:'/'})
      }
    }
  },
  {
    path:'/addaddress',
    name: 'addaddress',
    component:AddAddress,
    beforeEnter: (to, from, next) => {  
      //属于路由自己的拦截器
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/info',token)
        .then(()=>{
          // 当获取万用户信息之后才允许跳转
          next();
        })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({path:'/'})
      }
    }
  },
  {
    path:'/updateaddress',
    name: 'updateaddress',
    component:UpdateAddress,
    beforeEnter: (to, from, next) => {  
      //属于路由自己的拦截器
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/info',token)
        .then(()=>{
          // 当获取万用户信息之后才允许跳转
          next();
        })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({path:'/'})
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
