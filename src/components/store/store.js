import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // members: {
        //     student:[{
        //         student_id:""
        //     }],
        //     outsider:[]
        // }
        gibs: [
            {nickname: 'gob' , age: '20'},
            {nickname: 'ohm' , age: '21'},
            {nickname: 'patch' , age: '22'}
        ]
    }
})