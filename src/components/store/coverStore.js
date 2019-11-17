import axios from "axios";
import router from '../../router/index'
import { stat } from "fs";



export const coverStore = {
    state: {
        file: "",
        oldFile:"",
    },
    mutations: {
        setFile: (state, file) => {
            state.file = file
        },
    },
    actions: {
        setFile: ({ commit }, file) => {
            commit('setFile', file)
        },

        // setPath:({commit},cover) =>{
        //     commit('setPath',cover)
        // }
    },
    getters: {
        getFile(state){
            return state.file
        },
        // getPath(state){
        //     return state.path
        // }
    },
  
}