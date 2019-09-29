import axios from "axios";

export const imgStore = {
    state: {
        path: " ",
        images:[]
    },
    mutations: {
        setPath:(state, path)=>{
            state.path = path
        },
        setImages:(state,image) =>{
            state.images.push(image)
        }
    },
    actions: {
        setPath:({commit},path)=>{
            commit('setPath',path)
        },

        addImage:({commit},image)=>{
            commit('setImages',image)
        }
    },
    getters: {
        getPath(state){
            return state.path
        },
        getImages(state){
            return state.images
        }
    }
}