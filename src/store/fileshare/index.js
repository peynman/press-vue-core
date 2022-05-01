export default {
  namespaced: true,

  state: {
    accessModes: [
      {
        value: 'private',
        text: 'Private',
      },
      {
        value: 'public',
        text: 'Public',
      },
    ],
  },

  actions: {
    uploadFile (context, { file, payload }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/file-uploads',
        body: {
        },
      })
    },
  },

  getters: {
    availableAccessModes (state) {
      return state.accessModes
    },
  },
}
