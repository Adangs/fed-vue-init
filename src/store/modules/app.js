export default {
  namespaced: true,
  state: {
    loading: false,
    pending: {}
  },
  mutations: {
    SET_LOADING: (state, data) => {
      state.loading = data
    },
    PUSH_PENDING: (state, data) => {
      state.pending[data.url] = data
    },
    REMOVE_PENDING: (state, data) => {
      delete state.pending[data.url]
    }
  },
  actions: {
    // 全局请求状态
    setLoading ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', data)
        resolve(state)
      })
    },
    // 全局拦截重复请求
    pushPending ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('PUSH_PENDING', data)
        resolve(state)
      })
    },
    // 全局拦截重复请求
    removePending ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        if (state.pending[data.url] && data.cancel) {
          state.pending[data.url].cancel() // 执行取消操作
        } else if (state.pending[data.url]) {
          commit('REMOVE_PENDING', data)
        }
        // console.log(Object.keys(state.pending))
        resolve(state)
      })
    }
  }
}
