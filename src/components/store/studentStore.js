import axios from "axios";

export const studentStore = {
    state: {
        studentData: {
            // profile: {},
            access: Boolean,
            projects: [],
            totalProject: [{
                start_year_en: Number,
                total: Number
            }],
            allTag: []
        },
        dataToChart: []
    },
    actions: {
        LOAD_OWN_STUDENT_DATA: async function ({ commit, rootState }) {
            // const URL = "http://localhost:7000/users/default"
            const URL = "https://www.sit-acc.nruf.in.th/users/default"
            const { data } = await axios.get(
                URL, rootState.loginStore.config
            );
            console.log("---data--- : ", data)
            commit('SET_STUDENT_DATA', data)
        },
        LOAD_OTHER_STUDENT_DATA: async function ({ commit, rootState }, { user_role, user_id }) {
            var URL;
            var config;
            if (user_id == "") {
                URL = "https://www.sit-acc.nruf.in.th/users/default"
                config = rootState.loginStore.config
            } else {
                URL = "https://www.sit-acc.nruf.in.th/users/default?user_role=" + user_role + "&user_id=" + user_id
                if (rootState.loginStore.config.headers.Authorization == null) {
                    config = {
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    }
                } else {
                    config = rootState.loginStore.config
                }
            }
            console.log("URL : " + URL)
            console.log("config : ", config)

            const { data } = await axios.get(
                URL, config
            );

            console.log("---data--- : ", data)
            commit('SET_STUDENT_DATA', data)
        },
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
            // state.dataToChart.push(0)
            // for (var n = 0; n < state.studentData.totalProject.length; n++) {
            //     state.dataToChart.push(state.studentData.totalProject[n].total)
            // }
            var start = state.studentData.totalProject[0].start_year_en
            var last = state.studentData.totalProject[state.studentData.totalProject.length - 1].start_year_en
            var a = last - start

            if (a != 0) {
                for (var n = 0; n < a + 1; n++) {
                    if (n == 0) {
                        state.dataToChart.push(state.studentData.totalProject[0].total)
                    }
                    else if (n != 0 && n != a) {
                        for (var x = 0; x < state.studentData.totalProject.length; x++) {
                            if (state.studentData.totalProject[x + 1].start_year_en == n + start) {
                                state.dataToChart.push(state.studentData.totalProject[x + 1].total)
                                break
                            } else {
                                state.dataToChart.push(0)
                                break
                            }
                        }
                    }
                    else {
                        state.dataToChart.push(state.studentData.totalProject[state.studentData.totalProject.length - 1].total)
                    }
                }
            }
            else {
                state.dataToChart.push(0)
                state.dataToChart.push(state.studentData.totalProject[0].total)
            }


            return state.dataToChart
        }
    }
}




