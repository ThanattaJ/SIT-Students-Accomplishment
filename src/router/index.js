import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import student from '@/components/student'
import Profile from '@/components/Profile'
import ShowProject from '@/components/Project/ShowProject'
import Assignment from '@/components/Assignment'
import CreatePortfolioPage from '@/components/NewPortfolioPage/CreatePortfolioPage'
import PortfolioPageDetail from '@/components/NewPortfolioPage/PortfolioPageDetail'
import TeamMembers from '@/components/NewPortfolioPage/TeamMembers'
import Achievement from '@/components/NewPortfolioPage/Achievement'
import ProjectDetail from '@/components/Project/ProjectDetail'

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
        path: '/Assignment',
        name: 'Assignment',
        component: Assignment,
      },
      {
        path: '/ShowProject',
        name: 'ShowProject',
        component: ShowProject,
      }
       ]
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/CreatePortfolioPage',
      name: 'CreatePortfolioPage',
      component: CreatePortfolioPage,
    },
    {
      path: '/PortfolioPageDetail',
      name: 'PortfolioPageDetail',
      component: PortfolioPageDetail,
    },
    {
      path: '/TeamMembers',
      name: 'TeamMembers',
      component: TeamMembers,
    },
    {
      path: '/Achievement',
      name: 'Achievement',
      component: Achievement,
    },
    {
      path: '/ProjectDetail',
      name: 'ProjectDetail',
      component: ProjectDetail
    },
  ]
})
