import axios from "axios";

export const imgStore = {
    state: {
        path: " ",
        images:[],
        pic:''

    },
    mutations: {
        setPath:(state, path)=>{
            state.path = path
        },
        setImages:(state,image) =>{
            state.images.push(image)
        },
        setPic:(state,pic)=>{
            state.pic = pic
        }
    },
    actions: {
        setPath:({commit},path)=>{
            commit('setPath',path)
        },

        addImage:({commit},image)=>{
            commit('setImages',image)
        },
        setPic:({commit},pic)=>{
            commit('setPic',pic)
        }
    },
    getters: {
        getPath(state){
            return state.path
        },
        getImages(state){
            return state.images
        },
        getPic(state){
            return state.pic
        }
    }
}