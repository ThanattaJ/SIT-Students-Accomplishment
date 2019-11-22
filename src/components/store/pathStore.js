export const pathStore = {
    state: {
        // pathName: "http://localhost:7000" //rootState.pathStore.pathName
        pathName: "https://www.sit-acc.nruf.in.th",
        pathName_frontend: "https://accomplishment-sit.netlify.com"
    },
    actions: {

    },
    mutations: {

    },
    getters: {
        GET_PATHNAME(state) {
            return state.pathName
        },
        GET_PATHNAME_FRONTEND(state) {
            return state.pathName_frontend
        }
    }
}