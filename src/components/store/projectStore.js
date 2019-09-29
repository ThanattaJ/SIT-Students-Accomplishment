import axios from "axios";

const config = {
  headers : {
      'Content-Type': 'application/json',
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
  }
}

export const projectStore = {
    // state: {
    //     projectOfEachStudent: {}
    // },
    // actions: {
    //     LOAD_PROJECT_OF_EACH_STUDENT: async function ({ commit , rootState}) {
    //         const URL = "http://localhost:7000/users/default"
    //         console.log("เข้า LOAD_PROJECT_OF_EACH_STUDENT")
    //         const { data } = await axios.get(
    //             // URL, rootState.loginStore.config
    //             URL, config
    //         );
    //         console.log("LOAD_PROJECT_OF_EACH_STUDENT : ",data.access)
    //         console.log("LOAD_PROJECT_OF_EACH_STUDENT : ",data.profile)
    //         console.log("LOAD_PROJECT_OF_EACH_STUDENT : ",data.projects)
    //         console.log("LOAD_PROJECT_OF_EACH_STUDENT : ",data.totalProject)
    //         commit('SET_PROJECT_OF_EACH_STUDENT', data)
    //     }
    // },
    // mutations: {
    //     SET_PROJECT_OF_EACH_STUDENT: function (state, project) {
    //         state.projectOfEachStudent = project
    //     }
    // },
    // getters: {
    //     GET_PROJECT_OF_EACH_STUDENT: function (state) {
    //         return state.projectOfEachStudent
    //     }
    // }
}