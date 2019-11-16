import axios from "axios";

export const createPortPageStore = {
    state: {
        allStudent: [],
        selectedStudentMember: [],
        outsider: [],

        achievement: [],

        startProject: null,
        endProject: null,
        project_data: {
            project_name_th: null, //step1
            project_name_en: null, //step1
            project_detail: "",  //step2
            project_abstract: "", //step2
            haveOutsider: false, 
            start_month: null, //step1
            start_year_en: null, //step1
            end_month: null, //step1
            end_year_en: null, //step1
            project_type_name: "external",
        },

        //ใช้แสดงพวก step ในการ create project
        isExternalProject: true,
        isGroupProject: true,
        assignment_id: 0
    },
    actions: {
        LOAD_ALL_STUDENT: async function ({ commit, rootState }, student_id) { //ดึงนศทั้งหมด
            console.log("ดึงนศ")
            const URL = rootState.pathStore.pathName
            const { data } = await axios.get(
                URL+'/users/list_student/'+student_id
            );
            commit('SET_ALL_STUDENT', data)
        },
        // STEP3
        SET_SELECTED_STUDENT_MEMBER: function ({ commit }, student) {
            commit('SET_SELECTED_STUDENT_MEMBER', student)
        },
        SET_OUTSIDER: function ({ commit }, outsider) {
            commit('SET_OUTSIDER', outsider)
        },
        // STEP4
        SET_ACHIEVEMENT: function ({ commit }, achievement) {
            commit('SET_ACHIEVEMENT', achievement)
        },
        SET_ACHIEVEMENT_STATE:({commit},achievement)=>{
            commit('SET_ACHIEVEMENT_STATE',achievement)
        },
        // STEP1 & STEP2
        UPDATE_FIELD: function ({ commit }, { callSetter, value }) {
            commit(callSetter, value)
        },
        SET_HAVE_OUTSIDER: function ({ commit }) {
            commit('SET_HAVE_OUTSIDER')
        },
        //ใช้แสดงพวก step ในการ create project
        SET_PROJECTTYPE: function ({ commit }, isExternalProjectOrNot) {
            commit('SET_PROJECTTYPE', isExternalProjectOrNot)
        },
        SET_ISGROUP: function ({ commit }, isGroup) {
            commit('SET_ISGROUP', isGroup)
        },
        SET_ASSIGNMENTID: function ({ commit }, assignment_id) {
            commit('SET_ASSIGNMENTID', assignment_id)
        },
    },
    mutations: {
        SET_ALL_STUDENT: function (state, allStudent) {
            state.allStudent = []
            var studentID = allStudent.map((_item, index = 0) => _item.student_id);
            var studentFname = allStudent.map((_item, index = 0) => _item.firstname);
            var studentLname = allStudent.map((_item, index = 0) => _item.lastname);
            for (let i = 0; i < studentID.length; i++) {
                state.allStudent.push({
                    value: i + 1,
                    text: studentID[i],
                    firstname: studentFname[i],
                    lastname: studentLname[i]
                });
            }
        },
        SET_SELECTED_STUDENT_MEMBER: function (state, student) {
            state.selectedStudentMember = student
            state.selectedStudentMember.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
        },
        SET_OUTSIDER: function (state, outsider) {
            state.outsider.push({
                firstname: outsider.firstname,
                lastname: outsider.lastname
            })
        },
        SET_ACHIEVEMENT: function (state, achievement) {
            state.achievement.push({
                achievement_name: achievement.achievement_name,
                achievement_detail: achievement.achievement_detail,
                organize_by: achievement.organize_by,
                date_of_event: achievement.date_of_event
            })
        },  
        SET_ACHIEVEMENT_STATE:(state,achievement)=>{
            state.achievement =achievement
        },
        SET_HAVE_OUTSIDER: function (state) {
            state.project_data.haveOutsider = true
        },
        // STEP1
        SET_PROJECTNAME_EN: function (state, project_name_en) {
            state.project_data.project_name_en = project_name_en
        },
        SET_PROJECTNAME_TH: function (state, project_name_th) {
            state.project_data.project_name_th = project_name_th
        },
        SET_DATE_STARTPROJECT: function (state, start) {
            state.startProject = start
            var data = start._i
            state.project_data.start_month = data.substring(data.indexOf('/') + 1)
            state.project_data.start_year_en = data.substring(0, data.indexOf('/'))
        },
        SET_DATE_ENDPROJECT: function (state, end) {
            state.endProject = end
            var data = end._i
            state.project_data.end_month = data.substring(data.indexOf('/') + 1)
            state.project_data.end_year_en = data.substring(0, data.indexOf('/'))
        },
        // STEP2
        SET_PROJECT_DETAIL: function (state, project_detail) {
            state.project_data.project_detail = project_detail
        },
        SET_PROJECT_ABSTRACT: function (state, project_abstract) {
            state.project_data.project_abstract = project_abstract
        },
        //ใช้แสดงพวก step ในการ create project
        SET_PROJECTTYPE: function (state, isExternalProjectOrNot) {
            state.isExternalProject = isExternalProjectOrNot
            console.log('external project ? >>> ' + state.isExternalProject)
        },
        SET_ISGROUP: function (state, isGroup) {
            state.isGroupProject = isGroup
            console.log('Is group project ? >>> ' + state.isGroupProject)
        },
        SET_ASSIGNMENTID: function (state, assignment_id) {
            state.assignment_id = assignment_id
            console.log('assignment_id ? >>> ' + state.assignment_id)
        },
    },
    getters: {
        GET_ALL_STUDENT: function (state) {
            console.log("allStudent : ",state.allStudent)
            return state.allStudent
        },
        GET_SELECTED_STUDENT_MEMBER: function (state) {
            return state.selectedStudentMember
        },
        GET_OUTSIDER: function (state) {
            return state.outsider
        },
        GET_ACHIEVEMENT: function (state) {
            return state.achievement
        },
        // STEP1
        GET_PROJECTNAME_EN: function (state) {
            return state.project_data.project_name_en
        },
        GET_PROJECTNAME_TH: function (state) {
            return state.project_data.project_name_th
        },
        GET_DATE_STARTPROJECT: function (state) {
            return state.startProject
        },
        GET_DATE_ENDPROJECT: function (state) {
            return state.endProject
        },
        // STEP2
        GET_PROJECT_DETAIL: function (state) {
            return state.project_data.project_detail
        },
        GET_PROJECT_ABSTRACT: function (state) {
            return state.project_data.project_abstract
        },
        //
        GET_PROJECT_DATA: function (state) {
            return state.project_data
        },
        //ใช้แสดงพวก step ในการ create project
        GET_PROJECTTYPE: function (state) {
            return state.isExternalProject
        },
        GET_ISGROUP: function (state) {
            return state.isGroupProject
        },
        GET_ASSIGNMENTID: function (state) {
            return state.assignment_id
        },
    }
}