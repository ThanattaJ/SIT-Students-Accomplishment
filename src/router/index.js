import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import student from '@/components/student'
import GenerateResume from '@/components/GenerateResume'
import ShowProject from '@/components/Project/ShowProject'
import Assignment from '@/components/Assignment'
import CreateExternalPortPage from '@/components/NewPortfolioPage/CreateExternalPortPage'
import Document from '@/components/NewPortfolioPage/Document'
import Video from '@/components/NewPortfolioPage/Video'
import ProjectDetail from '@/components/Project/ProjectDetail'



Vue.use(Router)


export default new Router({
  mode: 'history',
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
        component: Assignment
      },
      {
        path: '/ShowProject',
        name: 'ShowProject',
        component: ShowProject
      }
       ]
    },
    {
      path: '/GenerateResume',
      name: 'GenerateResume',
      component: GenerateResume
    },
    {
      path: '/CreateExternalPortPage',
      name: 'CreateExternalPortPage',
      component: CreateExternalPortPage
    },
    {
      path: '/Document',
      name: 'Document',
      component: Document
    },
    {
      path: '/Video',
      name: 'Video',
      component: Video
    },
    {
      path: '/ProjectDetail/:pId',
      name: 'ProjectDetail',
      component: ProjectDetail
    },
  ]
})
