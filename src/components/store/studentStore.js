import axios from "axios";

export const studentStore = {
    state: {
        studentData: {
            profile: {
                // student_id: "",
                // firstname: "",
                // lastname: "",
                // email: null,
                // profile_picture: null,
                // viewer: 0,
                // resume_gen_count: 0,
                // curriculum_name: "",
                // nickname: ""
            },
            projects: [],
            numberOfProjects: 0,
            totalProject: [{
                start_year_en: 0,
                total: 0
            }],
            allTag: []
        },
        dataToChart: []
    },
    actions: {
        LOAD_OWN_STUDENT_DATA: async function ({ commit, rootState }) {
            rootState.loadingStore.loading = true
            const URL = rootState.pathStore.pathName
            const { data } = await axios.get(
                URL + '/users/default', rootState.loginStore.config
            );
            rootState.loadingStore.loading = false
            commit('SET_STUDENT_DATA', data)
        },
        LOAD_OTHER_STUDENT_DATA: async function ({ commit, rootState }, { user_role, user_id }) {
            rootState.loadingStore.loading = true

            var URL = rootState.pathStore.pathName
            var config;
            if (user_id == "") {
                URL = URL + "/users/default"
                config = rootState.loginStore.config
            } else {
                URL = URL + "/users/default?user_role=" + user_role + "&user_id=" + user_id
                // if (rootState.loginStore.username == null) {
                //     config = {
                //         'headers': {
                //             'Content-Type': 'application/json'
                //         }
                //     }
                //     console.log('ดู profile แบบไม่ login')
                // } 
                if (rootState.loginStore.username == user_id) {
                    config = rootState.loginStore.config
                    console.log('ดู profile ตัวเองแบบ login')
                }
            }
            const { data } = await axios.get(
                URL, config
            );
            rootState.loadingStore.loading = false
            commit('SET_STUDENT_DATA', data)
        },
        SET_STUDENT_PROJECT: function ({ commit }, projects) {
            commit('SET_STUDENT_PROJECT', projects)
        },
    },
    mutations: {
        SET_STUDENT_DATA: function (state, studentData) {
            state.studentData = studentData
            state.studentData.numberOfProjects = studentData.projects.length
        },
        SET_STUDENT_PROJECT: function (state, projects) {
            state.studentData.projects = projects
        }
    },
    getters: {
        GET_ACCESS: function (state) {
            return state.studentData.access
        },
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
            var start = state.studentData.totalProject[0].start_year_en
            var last = state.studentData.totalProject[state.studentData.totalProject.length - 1].start_year_en
            var a = last - start

            if (a != 0) {
                for (var n = 0; n < a + 1; n++) {
                    if (n == 0) {
                        state.dataToChart.push(state.studentData.totalProject[0].total)
                        // console.log('1) state.studentData.totalProject[0].total : ',state.studentData.totalProject[0].total)
                    }
                    else if (n != 0 && n != a) {
                        for (var x = 0; x < state.studentData.totalProject.length; x++) {
                            if (state.studentData.totalProject[x + 1].start_year_en == n + start) {
                                state.dataToChart.push(state.studentData.totalProject[x + 1].total)
                                // console.log('2) state.studentData.totalProject[x + 1].total : ',state.studentData.totalProject[x + 1].total)
                                break
                            } else {
                                state.dataToChart.push(0)
                                // console.log('3) ------ push(0) ------')
                                break
                            }
                        }
                    }
                    else {
                        state.dataToChart.push(state.studentData.totalProject[state.studentData.totalProject.length - 1].total)
                        // console.log('4) state.studentData.totalProject[state.studentData.totalProject.length - 1].total : ',state.studentData.totalProject[state.studentData.totalProject.length - 1].total)
                    }
                }
            }
            else {
                state.dataToChart.push(0)
                state.dataToChart.push(state.studentData.totalProject[0].total)
                // console.log('5)')
            }
            // console.log('6) state.dataToChart : >>>>> ',state.dataToChart)
            return state.dataToChart
        },
        GET_NUMBEROFPROJECTS: function (state) {
            return state.studentData.numberOfProjects
        },
    }
}




