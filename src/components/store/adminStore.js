import axios from "axios";

export const adminStore = {
    state: {
        course:[],
        lecturers:[],
        semester:[],
        thisShow:false,
        selectLecturer:[]
    },
    mutations: {
        set_course:(state,course)=>{
            state.course = course
        },
        set_lecturers:(state,lecturer)=>{
            state.lecturers = lecturer
        },
        set_lecturer:function(state,lecturers){
            state.lecturers = []
            var lecID =lecturers.map((_item,index = 0)=>_item.lecturer_id);
            var lecFirstname =lecturers.map((_item,index=0)=> _item.firstname);
            var lecLastname =lecturers.map((_item,index = 0)=>_item.lastname);
            for(let i=0;i<lecID.length; i++){
                state.lecturers.push({
                    value: i + 1,
                    text: lecID[i],
                    firstname: lecFirstname[i],
                    lastname:lecLastname[i]
                });
            }
        },
        set_select_lecturer(state,lecturer){
            state.lecturers.push(lecturer)
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
        set_lecturers:({commit},lecturer)=>{
            commit('set_lecturers',lecturer)
        },
        set_lecturer: async function ({commit}){
       
            const { data } = await axios.get(
                'https://www.sit-acc.nruf.in.th/users/list_lecturer'
            );
            commit('set_lecturer',data)
            // console.log("rer" , data)
        },
        set_select_lecturer: function ({commit},lecturer){
            commit('set_select_lecturer',lecturer)
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
            // console.log("lecturer : ",state.lecturers)
            return state.lecturers
        },
        get_select_lecturer(state){
            return state.selectLecturer
        },
        get_semester(state){
            return state.semester
        },
        getShow(state){
            return state.semester
        }
    }
}