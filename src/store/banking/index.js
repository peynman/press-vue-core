export default {
  namespaced: true,

  state: {
    currentCurrency: 1,
    currencies: [
      {
        value: 1,
        text: 'تومان',
      },
    ],
    bankGateways: [],
    bankGatewaysLoading: false,
  },

  actions: {
    fetchBankGateways (context) {
      context.commit('setBankGatewaysLoading', true)
      return context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Banking\\IBankGatewayRepository',
          method: 'getAllBankGateways',
          path: 'gateways',
        },
      ], { root: true })
        .then(json => {
          context.commit('setBankGateways', json.gateways)
          return Promise.resolve(json.gateways)
        })
        .finally(() => {
          context.commit('setBankGatewaysLoading', false)
        })
    },
  },

  mutations: {
    setBankGatewaysLoading (state, loading) {
      state.bankGatewaysLoading = loading
    },
    setBankGateways (state, gateways) {
      state.bankGateways = gateways
    },
  },

  getters: {
    currentCurrency (state) {
      return state.currentCurrency
    },
    availableCurrencies (state) {
      return state.currencies
    },
    currenciesById (state) {
      return state.currencies.reduce((dic, c) => {
        dic[c.value] = c
        return dic
      }, {})
    },

    getCurrencyTitle (state, getters) {
      return currency => {
        return getters.currenciesById[currency]?.text
      }
    },

    currentCurrencyTitle (state, getters) {
      return getters.getCurrencyTitle(state.currentCurrency)
    },

    bankGateways (state) {
      return state.bankGateways
    },

    isBankGatewaysLoading (state) {
      return state.bankGatewaysLoading
    },
  },
}
