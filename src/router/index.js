import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import student from '@/components/student'
import GenerateResume from '@/components/GenerateResume/GenerateResume'
import ShowProject from '@/components/Project/ShowProject'
// import Assignment from '@/components/Assignment'
import createPortPage from '@/components/CreatePortPage/createPortPage'
import CreateExternalPortPage from '@/components/NewPortfolioPage/CreateExternalPortPage'
import Document from '@/components/NewPortfolioPage/Document'
import Video from '@/components/Project/Video'
import ProjectDetail from '@/components/Project/ProjectDetail'
import admin from '@/components/admins/admin'
import allCourse from '@/components/admins/allCourse'
import ManageEditRequest from '@/components/admins/ManageEditRequest'
import lecturer from '@/components/admins/lecturer'
import login from '@/components/auth/login'
import courseSemester from '@/components/admins/courseSemester'
import allProjectList from '@/components/visitor/allProjectList'
import facultyProject from '@/components/visitor/facultyProject'
// Lecturer
import course from '@/components/lecturer/course'
import assignment from '@/components/lecturer/assignment'
import assignmentDetail from '@/components/lecturer/assignmentDetail'
// Student
import studentAssignment from '@/components/student/studentAssignment'
import studentAssignmentDetail from '@/components/student/studentAssignmentDetail'

Vue.use(Router)



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/student',
      name: 'student',
      component: student,
      children: [
        {
          path: '/ShowProject',
          name: 'ShowProject',
          component: ShowProject
        }
      ]
    },
    {
      path: '/assignment',
      component: studentAssignment
    },
    {
      path: '/studentAssignmentDetail/:assignmentId',
      component: studentAssignmentDetail
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
      children: [
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
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/Projects',
      name: 'allProjectList',
      component: allProjectList,
    },
    {
      path: '/Faculty',
      name: 'Faculty',
      component: facultyProject,
    },
    {
      path: '/course',
      name: 'course',
      component: course,
    },
    {
      path: '/allassignment/:courseId',
      name: 'assignment',
      component: assignment,
    },
    {
      path: '/assignmentDetail/:assignmentId',
      name: 'assignmentDetail',
      component: assignmentDetail,
    }
  ]
})

