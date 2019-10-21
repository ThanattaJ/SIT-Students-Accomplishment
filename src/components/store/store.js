import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { studentStore } from './studentStore'
import { lecturerStore } from './lecturerStore'
import { adminStore } from './adminStore'
import { projectStore } from './projectStore'
import { resumeStore } from './resumeStore'
import { courseStore } from './courseStore'
import { assignmentStore } from './assignmentStore'
import { createPortPageStore } from './createPortPageStore'
import { loginStore } from './loginStore'
import { alertLogin } from './alertLogin'
import { coverStore } from './coverStore'
import { imgStore } from './imgStore'
import { detailStore } from './detailStore'
import { pathStore } from './pathStore'


export const store = new Vuex.Store({
// export default new Vuex.Store({
    modules: {
        studentStore,
        lecturerStore,
        adminStore,
        projectStore,
        resumeStore,
        courseStore,
        assignmentStore,
        createPortPageStore,
        loginStore,
        alertLogin,
        coverStore,
        imgStore,
        detailStore,
        pathStore
    }
})