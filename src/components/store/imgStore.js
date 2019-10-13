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
            // cover
        },
        setPushImages:(state,image) =>{
            state.images.push(image)
        },
        setImages:(state,images)=>{
            state.images = images
        },
        // popImage: state =>{
        //     state.images.pop()
        // }
    },
    actions: {
        setPath:({commit},path)=>{
            commit("setPath",path)
        },

        addImage:({commit},image)=>{
            commit("setPushImages",image) 
        },
        setImage:({commit},images)=>{
            commit("setImages",images)
        },
        // popImage:({commit})=>{
        //     commit("popImage")
        // }
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