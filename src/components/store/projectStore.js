import axios from "axios";

export const projectStore = {
    state: {
        data: {},
        years: []

    },
    actions: {
        LOAD_ALL_PROJECT_VISITORVIEW: async function ({ commit, state, rootState }, {type, year}) {
            const URL = rootState.pathStore.pathName+"/projects/"+type+"?year="+year
            console.log("URL : "+URL)
            const { data } = await axios.get(
                URL
            );
            console.log("====== LOAD_ALL_PROJECT_VISITORVIEW ======")
            console.log("",data.projects)
            commit('SET_ALL_PROJECT_VISITORVIEW', data.projects)
            if(state.years.length == 0) {
                commit('SET_YEARS', data.years) 
             }
        },
        LOAD_PROJECT_BY_SEARCH: async function ({ commit, rootState }, {searchText, searchBy}) {
            const URL = rootState.pathStore.pathName+"/projects/search?by="+searchBy+"&search="+searchText
            console.log("URL : "+URL)
            const { data } = await axios.get(
                URL
            );
            commit('SET_ALL_PROJECT_VISITORVIEW', data)
        },
    },
    mutations: {
        SET_ALL_PROJECT_VISITORVIEW: function (state, projects) {
            state.data = projects
        },
        SET_YEARS: function (state, years) {
            state.years = years
        }
    },
    getters: {
        GET_ALL_PROJECT_VISITORVIEW: function (state) {
            return state.data
        },
        GET_YEARS: function (state) {
            return state.years
        },
    }
}