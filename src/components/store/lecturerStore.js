export const lecturerStore = {
    state: {
        course_name: "",
        academic_term_id: 3,
        course_id: 0
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
        }
    }
}