export default {
  namespaced: true,

  state: {
  },

  actions: {
    fetchReports (context, { url, name, filters, from, to, aggregate, func }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url,
        body: {
          filters,
          name,
          from,
          to,
          aggregate,
          function: func,
        },
      }, { root: true })
    },
  },
}
