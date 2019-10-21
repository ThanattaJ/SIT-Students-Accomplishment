export const pathStore = {
    state: {
        pathName: "http://localhost:7000" //rootState.pathStore.pathName
        // pathName: "https://www.sit-acc.nruf.in.th"
    },
    actions: {

    },
    mutations: {

    },
    getters: {
        GET_PATHNAMR(state) {
            return state.pathName
          }
    }
}