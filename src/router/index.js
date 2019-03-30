import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import student from '@/components/student'
import Profile from '@/components/Profile'
import Project from '@/components/Project'
import Assignment from '@/components/Assignment'
import CreatePortfolioPage from '@/components/CreatePortfolioPage'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'student',
      component: student,
      children:[
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: '/Project',
        name: 'project',
        component: Project,
      }
       ]
    },
    {
      path: '/Assignment',
      name: 'Assignment',
      component: Assignment,
    },
    {
      path: '/CreatePortfolioPage',
      name: 'CreatePortfolioPage',
      component: CreatePortfolioPage,
    }
  ]
})
