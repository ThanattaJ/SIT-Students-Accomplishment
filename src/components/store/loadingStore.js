export const loadingStore = {
    state: {
        loading: true
    },
    actions: {
        SET_LOADING_STATUS({ commit }, loadingStatus) {
            commit("SET_LOADING_STATUS", loadingStatus)
        },
    },
    mutations: {
        SET_LOADING_STATUS(state, loadingStatus) {
            state.loading = loadingStatus
        }
    },
    getters: {
        GET_LOADING(state) {
            return state.loading
        }
    }
}