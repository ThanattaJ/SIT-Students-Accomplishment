export const lecturerStore = {
    state: {
        course_name: "",
        academic_term_id: 3,
        course_id: 0,
        assignment_id: 0,
        project_id: 0,
        isApprover: false,
        assignmentProjectStatus: ''
    },
    actions: {
        SET_COURSENAME({ commit }, course_name) {
            commit("SET_COURSENAME", course_name)
        },
        SET_ACADEMIC_TERM_ID({ commit }, academic_term_id) {
            commit("SET_ACADEMIC_TERM_ID", academic_term_id)
        },
        SET_COURSE_ID({ commit }, course_id) {
            commit("SET_COURSE_ID", course_id)
        },
        SET_ASSIGNMENT_ID({ commit }, assignment_id) {
            console.log("id : ",assignment_id)
            commit("SET_ASSIGNMENT_ID", assignment_id)
        },
        SET_PROJECT_ID({ commit }, project_id) {
            commit("SET_PROJECT_ID", project_id)
        },
        SET_ISAPPROVER({ commit }, isApprover) {
            commit("SET_ISAPPROVER", isApprover)
        },
        SET_PROJECT_STATUS({ commit }, assignmentProjectStatus) {
            commit("SET_PROJECT_STATUS", assignmentProjectStatus)
        }
    },
    mutations: {
        SET_COURSENAME(state, course_name) {
            state.course_name = course_name
        },
        SET_ACADEMIC_TERM_ID(state, academic_term_id) {
            state.academic_term_id = academic_term_id
        },
        SET_COURSE_ID(state, course_id) {
            state.course_id = course_id
        },
        SET_ASSIGNMENT_ID(state, assignment_id) {
            state.assignment_id = assignment_id
        },
        SET_PROJECT_ID(state, project_id) {
            state.project_id = project_id
        },
        SET_ISAPPROVER(state, isApprover) {
            state.isApprover = isApprover
        },
        SET_PROJECT_STATUS(state, assignmentProjectStatus) {
            state.assignmentProjectStatus = assignmentProjectStatus
        }
    },
    getters: {
        GET_COURSENAME(state) {
            return state.course_name;
        },
        GET_ACADEMIC_TERM_ID(state) {
            return state.academic_term_id;
        },
        GET_COURSE_ID(state) {
            return state.course_id;
        },
        GET_ASSIGNMENT_ID(state){
            return state.assignment_id
        },
        GET_PROJECT_ID(state) {
            return state.project_id
        },
        GET_ISAPPROVER(state) {
            return state.isApprover
        },
        GET_PROJECT_STATUS(state) {
            return state.assignmentProjectStatus
        }
    }
}