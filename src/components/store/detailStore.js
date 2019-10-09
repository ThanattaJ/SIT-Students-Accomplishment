import axios from "axios";

export const detailStore = {
    state: {
        pID : ' ',  
        EditProject: false,
        abstract :' ',
        detail:'',
        achievements:'',
        member:'',
        nonMember:'',
        tool:'',
        ref:'',
    },
    mutations: {
        setPID:(state ,pID)=>{
            state.pID = pID
        },
        setEditProject:(state,edit)=>{

            state.EditProject = edit
        },
        setAbstract:(state,abstract)=>{
            state.abstract = abstract
        },
        setDetail:(state,detail)=>{
            state.detail = detail
        },
        setAchievements:(state,achievements)=>{
            state.achievements = achievements
        },
        setMember:(state,member)=>{
            state.member =member
        },
        setNonMember:(state , nonMember)=>{
            state.nonMember = nonMember
        },
        setTool:(state , tool)=>{
            state.tool = tool
        },
        setRef:(state, ref)=>{
            state.ref = ref
        }
    },
    actions: {
        setPID:({commit},pID)=>{
            commit('setPID',pID)
        },
        setEditProject:({commit},edit)=>{
            commit('setEditProject',edit)
        },
        setAbstract:({commit},abstract)=>{
            commit('setAbstract',abstract)
        },
        setDetail:({commit},detail)=>{
            commit('setDetail',detail)
        },
        setAchievements:({commit},achievements)=>{
            commit('setAchievements',achievements)
        },
        setMember:({commit},member)=>{
            commit('setMember',member)
        },
        setNonMember:({commit},nonMember)=>{
            commit('setNonMember',nonMember)
        },
        setTool:({commit},tool)=>{
            commit('setTool',tool)
        },
        setRef:({commit},ref)=>{
            commit('setRef',ref)
        }
    },
    getters: {
        getPID(state){
            return state.pID
        },
        getAbstract(state){
            return state.abstract
        },
        getEditProject(state){
            return state.EditProject
        },
        getDetail(state){
            return state.detail
        },
        getAchievements(state){
            return state.achievements
        },
        getMember(state){
            return state.member
        },
        getNonMember(state){
            return state.nonMember
        },
        getTool(state){
            return state.tool
        },
        getRef(state){
            return state.ref
        }
    }
}