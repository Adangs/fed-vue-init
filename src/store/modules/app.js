export default {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING: (state, data) => {
      state.loading = data
    }
  },
  actions: {
    // 全局请求状态
    async setLoading ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', data)
        resolve(state)
      })
    }
  }
}
