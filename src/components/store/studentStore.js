import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
    }
}


export const studentStore = {
    state: {
        studentData: {}
    },
    actions: {
        LOAD_STUDENT_DATA: async function ({ commit, rootState }) {
            const URL = "http://localhost:7000/users/default"
            console.log("เข้า LOAD_PROJECT_OF_EACH_STUDENT")
            const { data } = await axios.get(
                // URL, rootState.loginStore.config
                URL, config
            );
            console.log("access : ", data)
            // console.log("access : ", data.access)
            // console.log("profile : ", data.profile)
            // console.log("projects : ", data.projects)
            // console.log("totalProject : ", data.totalProject)
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
    }
}




