import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import student from '@/components/student'
import GenerateResume from '@/components/GenerateResume/GenerateResume'
import ShowProject from '@/components/Project/ShowProject'
import Assignment from '@/components/Assignment'
import createPortPage from '@/components/CreatePortPage/createPortPage'
import CreateExternalPortPage from '@/components/NewPortfolioPage/CreateExternalPortPage'
import Document from '@/components/NewPortfolioPage/Document'
import Video from '@/components/NewPortfolioPage/Video'
import ProjectDetail from '@/components/Project/ProjectDetail'
import admin from '@/components/admins/admin'
import allCourse from '@/components/admins/allCourse'
import ManageEditRequest from '@/components/admins/ManageEditRequest'
import lecturer from '@/components/admins/lecturer'
import login_Modal from '@/components/login/login_Modal'
import courseSemester from '@/components/admins/courseSemester'


Vue.use(Router)


const routerOptions = [
  {
    path: '/login_Modal',
    component: 'login_Modal'
  }
]



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
      path: '/createPortPage',
      name: 'createPortPage',
      component: createPortPage
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
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children:[
        {
          path: '/allCourse',
          name: 'allCourse',
          component: allCourse
        },
        {
          path: '/ManageEditRequest',
          name: 'ManageEditRequest',
          component: ManageEditRequest
        },
        {
          path: '/lecturer',
          name: 'lecturer',
          component: lecturer
        },
        {
          path: '/courseSemester',
          name: 'courseSemester',
          component: courseSemester
        },
        {
          path: '/courseSemester/:semister',
          name: 'courseSemester',
          component: courseSemester
        }

      ]
    },
    {
          path: '/login_Modal',
          name: 'login_Modal',
          component: login_Modal,
    }
  ]
})
