export default {
  namespaced: true,

  state: {
    captcha: {
      loading: false,
      key: null,
      image: null,
    },
  },

  actions: {
    fetchCaptcha ({ commit, dispatch, state, rootState }) {
      if (state.captcha.loading) {
        return
      }

      commit('startLoading')
      return dispatch('fetchSources', [
        {
          resource: 'object',
          class: 'captcha',
          path: 'captcha',
        },
      ], { root: true })
      .then(response => {
        commit('endLoading')
        if (response?.captcha) {
          commit('setCaptcha', response.captcha)
        }
        return Promise.resolve(response)
      }).finally(() => {
        commit('endLoading')
      })
    },
  },

  mutations: {
    setCaptcha (state, captcha) {
      state.captcha.key = captcha?.key
      state.captcha.image = captcha?.img
    },
    startLoading (state) {
      state.captcha.loading = true
    },
    endLoading (state) {
      state.captcha.loading = false
    },
  },

  getters: {
    captchaKey (state) {
      return state.captcha.key
    },
    captchaImage (state) {
      return state.captcha.image
    },
    captchaLoading (state) {
      return state.captcha.loading
    },
  },
}
