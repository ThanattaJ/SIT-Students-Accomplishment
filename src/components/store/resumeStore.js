import axios from "axios";
import { stat } from "fs";

export const resumeStore = {
    state: {
        showPage: 1,
        website: [],
        selectedExpe: [],
        resumeData: {
            profile: {},
            language: [],
            education: [],
            skill: [],
            social: {},
            projects: []
        }
    },
    actions: {
        SET_PAGE: function ({ commit }, page) {
            commit('SET_PAGE', page)
        },
        LOAD_RESUME_DATA: async function ({ commit, rootState }) {
            const URL = rootState.pathStore.pathName
            const { data } = await axios.get(
                URL + '/users/generate-resume/' + rootState.loginStore.username, rootState.loginStore.config
            );
            commit('SET_RESUME_DATA', data)

            var allNetwork = [{
                id: 0,
                network: 'Twitter',
                color: '#47ABE7'
            },
            {
                id: 1,
                network: 'Facebook',
                color: '#4267b2'
            },
            {
                id: 2,
                network: 'Instagram',
                color: '#FF007A'
            },
            {
                id: 3,
                network: 'Linkedin',
                color: '#0077B5'
            },
            {
                id: 4,
                network: 'Github',
                color: '#24292D'
            },
            {
                id: 5,
                network: 'Pinterest',
                color: '#E60122'
            },
            {
                id: 6,
                network: 'Vimeo',
                color: '#1CB7EA'
            },
            {
                id: 7,
                network: 'Tumblr',
                color: '#000000'
            },
            {
                id: 8,
                network: 'Flickr',
                color: '#0063DB'
            },
            {
                id: 9,
                network: 'Link',
                color: '#DB6318'
            },
            ]
            var websiteTmp = []
            var socialTmp = data.social
            var numOfSocails = Object.keys(socialTmp).length
            console.log("numOfSocails : " + numOfSocails)
            for (var n = 0; n < numOfSocails; n++) {
                var nw = allNetwork[n].network
                if (socialTmp[nw] != null) {
                    websiteTmp.push({
                        network: nw,
                        color: allNetwork[n].color,
                        username: socialTmp[nw]
                    })
                }
            }
            commit('SET_WEBSITE', websiteTmp)

        },
        UPDATE_FIELD: function ({ commit }, { callSetter, value }) {
            commit(callSetter, value)
        },
        SET_BIRTHDAY: function ({ commit },  dob ) {
            commit('SET_BIRTHDAY', dob)
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
            console.log(" -------------- state.resumeData  -------------- ")
            console.log("", state.resumeData)
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
            console.log("social : ", state.resumeData.social)
            return state.resumeData.social
        },
        GET_WEBSITE: function (state) {
            console.log("website : ", state.website)
            return state.website
        },
    }
}