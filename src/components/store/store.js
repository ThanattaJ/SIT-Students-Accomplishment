import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { studentStore } from './studentStore'
import { teacherStore } from './teacherStore'
import { adminStore } from './adminStore'
import { projectStore } from './projectStore'
import { resumeStore } from './resumeStore'
import { courseStore } from './courseStore'
import { assignmentStore } from './assignmentStore'
import { createPortPageStore } from './createPortPageStore'
import { loginStore } from './loginStore'
import { alertLogin } from './alertLogin'


export const store = new Vuex.Store({
// export default new Vuex.Store({
    modules: {
        studentStore,
        teacherStore,
        adminStore,
        projectStore,
        resumeStore,
        courseStore,
        assignmentStore,
        createPortPageStore,
        loginStore,
        alertLogin
    }
})