export default {
  namespaced: true,

  state: {},

  actions: {
    fetchWalletTransactions (context, page) {
      return context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Wallet\\IWalletTransactionRepository',
          method: 'getWalletTransactionsPaginated',
          path: 'transactions',
          args: [
            {
              index: 1,
              value: page,
            },
          ],
        },
      ], { root: true })
        .then(json => {
          return Promise.resolve(json.transactions)
        })
    },
  },
}
