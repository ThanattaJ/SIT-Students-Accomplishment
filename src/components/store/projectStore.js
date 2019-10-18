import axios from "axios";

export const projectStore = {
    state: {
        data: {}
    },
    actions: {
        LOAD_ALL_PROJECT_VISITORVIEW: async function ({ commit, rootState }, {type, year}) {
            const URL = rootState.pathStore.pathName+"/projects/"+type+"?year="+year
            console.log("URL : "+URL)
            const { data } = await axios.get(
                URL
            );
            commit('SET_ALL_PROJECT_VISITORVIEW', data)
        },
        LOAD_PROJECT_BY_SEARCH: async function ({ commit, rootState }, {searchText, searchBy}) {
            const URL = rootState.pathStore.pathName+"/projects/search?by="+searchBy+"&search="+searchText
            console.log("URL : "+URL)
            const { data } = await axios.get(
                URL
            );
            commit('SET_ALL_PROJECT_VISITORVIEW', data)
            commit('SET_ALL_PROJECT_VISITORVIEW', data)
        },
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