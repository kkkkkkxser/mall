import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'

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
        }
      ]
    }
  ]
})
