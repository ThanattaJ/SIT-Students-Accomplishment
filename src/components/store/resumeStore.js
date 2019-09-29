import axios from "axios";

export const resumeStore = {
    state: {
        showPage: 1,
        website: [],
        selectedExpe: [],
        // skill: [],
        resumeData: {
            profile: {
            }
        }
    },
    actions: {
        SET_PAGE: function ({ commit }, page) {
            commit('SET_PAGE', page)
        },
        LOAD_RESUME_DATA: async function ({ commit, rootState }) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
                }
            }
            // const URL = "http://localhost:7000/users/generate-resume/"
            const URL = "https://www.sit-acc.nruf.in.th/users/generate-resume/"
            // const URL = "http://localhost:7000/users/generate-resume/student01"
            const { data } = await axios.get(
                URL+rootState.loginStore.userName , rootState.loginStore.config
                // URL, config

            );
            console.log(data)
            commit('SET_RESUME_DATA', data)
        },
        UPDATE_FIELD: function ({ commit }, { callSetter, value }) {
            commit(callSetter, value)
        },
        //WEBSITE
        SEND_WEB_TOSTATE: function ({ commit }, web) {
            commit('SET_WEBSITE', web)
        },
        SET_SOCIAL: function ({ commit }, social) {
            commit('SET_SOCIAL', social)
        }
    },
    mutations: {
        SET_PAGE: function (state, page) {
            state.showPage = page
            // console.log(state.showPage)
        },
        SET_RESUME_DATA: function (state, resumeData) {
            state.resumeData = resumeData
        },
        //PERSONAL
        SET_FIRSTNAME: function (state, firstname) {
            state.resumeData.profile.firstname = firstname
        },
        SET_LASTNAME: function (state, lastname) {
            state.resumeData.profile.lastname = lastname
        },
        SET_NICKNAME: function (state, nickname) {
            state.resumeData.profile.nickname = nickname
        },
        SET_BIOGRAPHY: function (state, bio) {
            state.resumeData.profile.introduce_detail = bio
        },
        //ADDRESS
        SET_STREET: function (state, street) {
            state.resumeData.profile.description = street
        },
        SET_SUBDISTRICT: function (state, subdistrict) {
            state.resumeData.profile.subdistrict = subdistrict
        },
        SET_DISTRICT: function (state, district) {
            state.resumeData.profile.district = district
        },
        SET_PROVINCE: function (state, province) {
            state.resumeData.profile.province = province
        },
        SET_ZIPCODE: function (state, zipcode) {
            state.resumeData.profile.postcode = zipcode
        },
        //CONTACT INFO
        SET_PHONENO: function (state, phoneno) {
            state.resumeData.profile.telephone_number = phoneno
        },
        SET_EMAIL: function (state, email) {
            state.resumeData.profile.email = email
        },
        SET_BIRTHDAY: function (state, birth) {
            state.resumeData.profile.birthday = birth
        },
        SET_SOCIAL: function (state, social) {
            console.log("เข้า SET_SOCIAL")
            state.resumeData.social = social
        },
        SET_WEBSITE: function (state, web) {
            console.log("เข้า SET_SOCIAL")
            state.website = web
        }
    },
    getters: {
        GET_SHOWPAGE: function (state) {
            return state.showPage
        },
        GET_RESUME_DATA: function (state) {
            return state.resumeData
        },
        //PERSONAL
        GET_FIRSTNAME: function (state) {
            return state.resumeData.profile.firstname
        },
        GET_LASTNAME: function (state) {
            return state.resumeData.profile.lastname
        },
        GET_NICKNAME: function (state) {
            return state.resumeData.profile.nickname
        },
        GET_BIOGRAPHY: function (state) {
            return state.resumeData.profile.introduce_detail
        },
        //ADDRESS
        GET_STREET: function (state) {
            return state.resumeData.profile.description
        },
        GET_SUBDISTRICT: function (state) {
            return state.resumeData.profile.subdistrict
        },
        GET_DISTRICT: function (state) {
            return state.resumeData.profile.district
        },
        GET_PROVINCE: function (state) {
            return state.resumeData.profile.province
        },
        GET_ZIPCODE: function (state) {
            return state.resumeData.profile.postcode
        },
        //CONTACT INFO
        GET_PHONENO: function (state) {
            return state.resumeData.profile.telephone_number
        },
        GET_EMAIL: function (state) {
            return state.resumeData.profile.email
        },
        GET_BIRTHDAY: function (state) {
            return state.resumeData.profile.birthday
        },
        //WEBSITE
        GET_WEBSITE: function (state) {
            console.log("website : ",state.website)
            return state.website
        },
        //EDUCATION
        GET_EDUCATION_DATA: function (state) {
            return state.resumeData.education
        },
        //EXPERIENCE
        GET_EXPERIENCE_DATA: function (state) {
            return state.resumeData.projects
        },
        GET_EXPERIENCE_SELECTED: function (state) {
            return state.selectedExpe
        },
        //SKILL
        GET_SKILL: function (state) {
            return state.resumeData.skill
        },
        //LANGUAGE
        GET_LANGUAGE: function (state) {
            return state.resumeData.language
        },
        //SOCIAL
        GET_SOCIAL: function (state) {
            console.log("social : ",state.resumeData.social)
            return state.resumeData.social
        }
    }
}