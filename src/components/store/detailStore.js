import axios from "axios";

export const detailStore = {
    state: {
        pID : ' '
    },
    mutations: {
        setPID:(state ,pID)=>{
            state.pID = pID
        }
    },
    actions: {
        setPID:({commit},pID)=>{
            commit('setPID',pID)
        }
    },
    getters: {
        getPID(state){
            return state.pID
        }
    }
}