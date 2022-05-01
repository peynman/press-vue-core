export default {
  namespaced: true,

  state: {
    user: null,
  },

  actions: {
    fetchMe (context) {
      return context.dispatch('apiCall', {
        url: '/api/me',
        method: 'POST',
      }, { root: true }).then(json => {
        context.commit('setUser', json.user)
        return Promise.resolve(json)
      })
    },
    updateDetails (context, data) {
      return context.dispatch('apiCall', {
        url: '/api/me/profile',
        method: 'POST',
        body: data,
      }, { root: true }).then(json => {
        context.commit('setUser', json.user)
        return Promise.resolve(json)
      })
    },
    addAddress (context, address) {
      return context.dispatch('apiCall', {
        url: '/api/me/profile/add-address',
        method: 'POST',
        body: address,
      }, { root: true }).then(json => {
        context.commit('addAddress', json)
        return Promise.resolve(json)
      })
    },
    updateAddress (context, address) {
      return context.dispatch('apiCall', {
        url: `/api/me/profile/update-address/${address.id}`,
        method: 'POST',
        body: address,
      }, { root: true }).then(json => {
        context.commit('updateAddress', json)
        return Promise.resolve(json)
      })
    },
    removeAddress (context, id) {
      return context.dispatch('apiCall', {
        url: `/api/me/profile/remove-address/${id}`,
        method: 'DELETE',
      }, { root: true }).then(json => {
        context.commit('removeAddress', id)
        return Promise.resolve(json)
      })
    },

    changePassword (context, { old, password, confirmation }) {
      return context.dispatch('apiCall', {
        url: `/api/me/update-password`,
        method: 'POST',
        body: {
          old,
          password,
          password_confirmation: confirmation,
        },
      }, { root: true })
    },
  },

  getters: {
    user (state) {
      return state.user
    },
  },

  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem('api-user', JSON.stringify(state.user))
    },

    addAddress (state, address) {
      if (!state.user.addresses) {
        state.user.addresses = []
      }

      state.user.addresses.push(address)
    },

    removeAddress (state, id) {
      const index = state.user.addresses.findIndex(a => a.id === id)
      if (state.user.addresses && index >= 0) {
        state.user.addresses.splice(index, 1)
      }
    },

    updateAddress (state, address) {
      const index = state.user.addresses.findIndex(a => a.id === address.id)
      if (state.user.addresses && index >= 0) {
        state.user.addresses[index] = address
      }
    },
  },
}
