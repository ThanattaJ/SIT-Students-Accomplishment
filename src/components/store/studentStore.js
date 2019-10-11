import axios from "axios";

export const studentStore = {
    state: {
        studentData: {},
        dataToChart: []
    },
    actions: {
        LOAD_STUDENT_DATA: async function ({ commit, rootState }) {
            // const URL = "http://localhost:7000/users/default"
            const URL = "https://www.sit-acc.nruf.in.th/users/default"
            const { data } = await axios.get(
                URL, rootState.loginStore.config
            );
            commit('SET_STUDENT_DATA', data)
        }
    },
    mutations: {
        SET_STUDENT_DATA: function (state, studentData) {
            state.studentData = studentData
        }
    },
    getters: {
        // GET_STUDENT_DATA: function (state) {
        //     return state.studentData
        // },
        GET_STUDENT_PROFILE: function (state) {
            return state.studentData.profile
        },
        GET_STUDENT_PROJECT: function (state) {
            return state.studentData.projects
        },
        GET_STUDENT_TAG: function (state) {
            return state.studentData.allTag
        },
        GET_STUDENT_TOTALPROJECT: function (state) {
            return state.studentData.totalProject
        },
        GET_DATATOCHART: function (state) {
            state.dataToChart = []
            state.dataToChart.push(0)
            for(var n = 0; n < state.studentData.totalProject.length ; n++){
                state.dataToChart.push(state.studentData.totalProject[n].total)
            }
            return state.dataToChart
        }
    }
}




