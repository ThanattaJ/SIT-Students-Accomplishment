import axios from "axios";

export const projectStore = {
    state: {
        data: {}
    },
    actions: {
        LOAD_ALL_PROJECT_VISITORVIEW: async function ({ commit, rootState }) {
            // const URL = "http://localhost:7000/users/default"
            const URL = "https://www.sit-acc.nruf.in.th/projects/all/present"
            const { data } = await axios.get(
                URL
            );
            commit('SET_ALL_PROJECT_VISITORVIEW', data)
        }
    },
    mutations: {
        SET_ALL_PROJECT_VISITORVIEW: function (state, projects) {
            state.data = projects
        }
    },
    getters: {
        GET_ALL_PROJECT_VISITORVIEW: function (state) {
            return state.data
        },
    }
}