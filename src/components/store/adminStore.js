export const adminStore = {
    state: {
        course:[],
        lecturer:[],
        semester:[],
        thisShow:false
    },
    mutations: {
        set_course:(state,course)=>{
            state.course =course
        },
        set_lecturer:(state,lecturer)=>{
            state.lecturer =lecturer
        },
        set_put_semester:(state,semester)=>{
            state.semester.push(semester) 
        },
        set_semester:(state,semester)=>{
            state.semester = semester
        },
        setShow:(state,thisShow)=>{
            state.thisShow =thisShow
        }
    },
    actions: {
        set_course:({commit},course)=>{
            commit('set_course',course)
        },
        set_lecturer:({commit},lecturer)=>{
            commit('set_lecturer',lecturer)
        },
        add_semester:({commit},semester)=>{
            commit('set_put_semester',semester)
        },
        set_semester:({commit},semester)=>{
            commit('set_semester',semester)
        },
        setShow:({commit},thisShow)=>{
            commit('setShow',thisShow)
        }
    },
    getters: {
        get_course(state){
            return state.course
        },
        get_lecturer(state){
            return state.lecturer
        },
        get_semester(state){
            return state.semester
        },
        getShow(state){
            return state.semester
        }
    }
}