import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import student from '@/components/student'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/student',
      name: 'student',
      component: student
    },
      
  ]
})
