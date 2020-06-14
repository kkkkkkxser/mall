import Vue from 'vue'
import Router from 'vue-router'
// 移动端
import Home from '@/components/Home'
import Index from '@/components/Index'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Menu from '@/components/Menu'
import Product from '@/components/Product'
// 后台管理
import BackLogin from '@/components/BackLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect:'/index',
      children:[
        {
          path:'/index',
          component:Index
        },{
          path:'/about',
          component:About
        },{
          path:'/contact',
          component:Contact
        },{
          path:'/menu',
          component:Menu
        }
      ]
    },
    {
      path:'/product/:image',
      component:Product
    },
    {
      path:'/backlogin',
      component:BackLogin
    }
  ]
})
