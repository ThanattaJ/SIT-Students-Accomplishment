import axios from "axios";

export const projectStore = {
    state: {
        data: {},
        profiles: {},
        courses: [],
        years: [],

        vdo_pathname: ''

    },
    actions: {
        LOAD_ALL_PROJECT_VISITORVIEW: async function ({ commit, state, rootState }, {type, year, searchBy, searchText}) {
            var URL = rootState.pathStore.pathName+"/projects/"+type;
            if(type == 'all'){
                URL += "?year="+year
            }else if(type == 'search'){
                URL += "?by="+searchBy+"&search="+searchText
            }else if(type == 'profile'){
                URL += "?search="+searchText
            }
            console.log("URL : "+URL)
            const { data } = await axios.get(
                URL
            );
            // console.log("data : ",data)
            if(type == 'all' || type == 'search'){
                commit('SET_ALL_PROJECT_VISITORVIEW', data.projects)
            }
            else if(type == 'profile'){
                commit('SET_ALL_PROFILE', data.profile)                
        }
            else if(type == 'assignment'){
                commit('SET_ALL_COURSE_PROJECT', data.courses)                
            }
            if(state.years.length == 0) {
                commit('SET_YEARS', data.years) 
             }
        },
        SET_ALL_PROJECT_VISITORVIEW: function ({ commit }, projects) {
            commit('SET_ALL_PROJECT_VISITORVIEW', projects)
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
        SET_ALL_PROFILE: function (state, profiles) {
            state.profiles = profiles
        },
        SET_ALL_COURSE_PROJECT: function (state, courses) {
            console.log('store set course')
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
        GET_ALL_PROFILE: function (state) {
            return state.profiles
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