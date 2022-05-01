export default {
  namespaced: true,

  state: {
  },

  actions: {
    loadPage (context, path) {
      return context.dispatch('methodCall', {
        method: 'GET',
        url: path,
      }, { root: true })
    },
  },

}
