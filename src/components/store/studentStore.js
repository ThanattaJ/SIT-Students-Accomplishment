import axios from "axios";

export const studentStore = {
    state: {
        studentData: {}
    },
    actions: {
        LOAD_STUDENT_DATA: async function ({ commit, rootState }) {
            const URL = "http://localhost:7000/users/default"
            // const URL = "https://www.sit-acc.nruf.in.th/users/default"
            console.log("เข้า LOAD_STUDENT_DATA")
            const { data } = await axios.get(
                URL, rootState.loginStore.config
            );
            console.log("access : ", data)
            commit('SET_STUDENT_DATA', data)
        }
    },
    mutations: {
        SET_STUDENT_DATA: function (state, project) {
            state.studentData = project
        }
    },
    getters: {
        GET_STUDENT_DATA: function (state) {
            return state.studentData
        },
        GET_STUDENT_PROFILE: function (state) {
            return state.studentData.profile
        },
        GET_STUDENT_PROJECT: function (state) {
            return state.studentData.projects
        },
        GET_STUDENT_TAG: function (state) {
            return state.studentData.allTag
        }
    }
}




