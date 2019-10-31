import axios from "axios";

export const projectStore = {
    state: {
        data: {},
        courses: [],
        years: [],

        vdo_pathname: ''

    },
    actions: {
        LOAD_ALL_PROJECT_VISITORVIEW: async function ({ commit, state, rootState }, {type, year}) {
            const URL = rootState.pathStore.pathName+"/projects/"+type+"?year="+year
            console.log("URL : "+URL)
            const { data } = await axios.get(
                URL
            );
            console.log("=== LOAD_ALL_PROJECT_VISITORVIEW ===")
            console.log("",data.projects)
            if(type == 'all'){
                commit('SET_ALL_PROJECT_VISITORVIEW', data.projects)
            }
            else if(type == 'assignment'){
                commit('SET_ALL_COURSE_PROJECT', data.courses)                
            }
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
        SET_VDO_PATHNAME: function ({ commit }, vdo_pathname) {
            commit('SET_VDO_PATHNAME', vdo_pathname)
        }
    },
    mutations: {
        SET_ALL_PROJECT_VISITORVIEW: function (state, projects) {
            state.data = projects
        },
        SET_ALL_COURSE_PROJECT: function (state, courses) {
            state.courses = courses
        },
        SET_YEARS: function (state, years) {
            state.years = years
        },
        SET_VDO_PATHNAME: function (state, vdo_pathname) {
            state.vdo_pathname = vdo_pathname
        },
    },
    getters: {
        GET_ALL_PROJECT_VISITORVIEW: function (state) {
            return state.data
        },
        GET_ALL_COURSE_PROJECT: function (state) {
            return state.courses
        },
        GET_YEARS: function (state) {
            return state.years
        },
        GET_VDO_PATHNAME: function (state) {
            return state.vdo_pathname
        }
    }
}