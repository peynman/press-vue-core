import { areEqualShallow } from '../../utils/helpers'
import { getProductPriceTag } from '../../utils/productHelpers'

export default {
  namespaced: true,

  state: {
    loading: false,
    purchasingCart: {
      products: [],
      amount: 0,
      currency: 1,
    },
    defaultShipping: 25000,
  },

  actions: {
    addToCart (context, details) {
      if (context.rootGetters.isLoggedIn) {
        context.commit('setLoading', true)
        return context.dispatch('apiCall', {
          method: 'POST',
          url: '/api/me/current-cart/add',
          body: {
            productId: details.product.id,
            quantity: details.quantity,
            data: details.extra,
          },
        }, { root: true })
          .then(json => {
            context.commit('updateCart', json)
            context.dispatch('analytics/trackCartAddItem', {
              cart: json,
              product: details.product,
              details,
            }, { root: true })
            return Promise.resolve(json)
          })
          .finally(() => {
            context.commit('setLoading', false)
          })
      }

      context.commit('addToCart', details)
      return Promise.resolve(context.getters.cart)
    },

    removeFromCart (context, details) {
      if (context.rootGetters.isLoggedIn) {
        context.commit('setLoading', true)
        return context.dispatch('apiCall', {
          method: 'POST',
          url: '/api/me/current-cart/remove',
          body: {
            productId: details.product.id,
            data: details.product.pivot?.data?.extra,
          },
        }, { root: true })
          .then(json => {
            context.commit('updateCart', json)
            context.dispatch('analytics/trackCartRemoveItem', {
              cart: json,
              productName: details.product.name,
            }, { root: true })
            return Promise.resolve(json)
          })
          .finally(() => {
            context.commit('setLoading', false)
          })
        }

      context.commit('removeFromCart', details)
      return Promise.resolve(context.getters.cart)
    },

    changeQuantity (context, details) {
      context.commit('changeQuantity', details)

      if (context.rootGetters.isLoggedIn) {
        context.commit('setLoading', true)
        return context.dispatch('syncWithRemote')
      }
    },

    checkGiftCode (context, code) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/me/current-cart/apply/gift-code',
        body: {
          currency: context.rootGetters['banking/currentCurrency'],
          gift_code: code,
        },
      }, { root: true })
        .then(json => {
          context.commit('updateCart', json)
          return Promise.resolve(json)
        })
    },

    updateDeliveryDetails (context, { addressId, deliveryName }) {
      context.commit('setLoading', true)
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/me/current-cart/delivery',
        body: {
          currency: context.rootGetters['banking/currentCurrency'],
          delivery_agent: deliveryName,
          delivery_address: addressId,
        },
      }, { root: true })
        .then(json => {
          context.commit('updateCart', json)
          return Promise.resolve(json)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },

    syncWithRemote (context) {
      context.commit('setLoading', true)
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/me/current-cart/update',
        body: {
          currency: context.rootGetters['banking/currentCurrency'],
          products: context.getters.cart?.products?.map(p => ({
            id: p.id,
            quantity: p.pivot?.data?.quantity,
            data: p.pivot?.data?.extra ?? {},
          })),
        },
      }, { root: true })
        .then(json => {
          context.commit('updateCart', json)
          context.dispatch('analytics/trackCartAmount', {
            cart: json,
          })
          return Promise.resolve(json)
        }, { root: true })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },

    onSignedIn (context) {
      const localCart = context.getters.cart
      const user = context.rootGetters['profile/user']
      if (localCart) {
        if (localCart.id === user?.purchase_cart?.id) {
          if (localCart.updated_at !== user?.purchase_cart?.updated_at) {
            context.dispatch('syncWithRemote')
            return
          }
        }
      }

      if (user?.purchase_cart?.id > 0) {
        if (localCart?.id !== user?.purchase_cart?.id) {
          context.dispatch('analytics/trackCartCleared', {}, { root: true })
          if (user.purchase_cart?.products) {
            user.purchase_cart.products.forEach(p => {
              context.dispatch('analytics/trackCartAddItem', {
                cart: user.purchase_cart,
                product: p,
                details: p.pivot.data,
              }, { root: true })
            })
          }
        }
        context.commit('updateCart', user.purchase_cart)
      }
    },

    validateCart (context) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/me/current-cart/validate',
        body: {
          currency: context.rootGetters['banking/currentCurrency'],
          products: context.getters.cart?.products?.map(p => ({
            id: p.id,
            quantity: p.pivot?.data?.quantity,
            data: p.pivot?.data?.extra ?? {},
          })),
          delivery_agent: context.getters.cart?.data?.delivery_agent,
          delivery_address: context.getters.cart?.data?.delivery_address_id,
          use_balance: context.getters.cart?.data?.use_balance,
          gift_code: context.getters.cart.data?.gift_code?.code,
        },
      }, { root: true })
    },

    fetchCartsHistory (context, page) {
      return context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Cart\\ICartRepository',
          method: 'getPurchasedCartsPaginated',
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

  mutations: {
    addToCart (state, details) {
      const alreadyExists = state.purchasingCart.products
        ?.find(p => p.id === details.product.id && areEqualShallow(p.pivot?.data?.extra, details.extra))

      if (alreadyExists) {
        alreadyExists.pivot.data.quantity += parseInt(details.quantity)
      } else {
        state.purchasingCart.products.push({
          ...details.product,
          pivot: {
            data: {
              quantity: parseInt(details.quantity),
              amount: getProductPriceTag(details.product),
              extra: details.extra,
            },
          },
        })
      }

      state.purchasingCart.amount = state.purchasingCart.products.reduce((a, p) => {
        return a + getProductPriceTag(p)
      }, 0)
      state.purchasingCart.updated_at = (new Date()).toISOString()
      localStorage.setItem('cart', JSON.stringify(state.purchasingCart))
    },

    removeFromCart (state, details) {
      const index = state.purchasingCart.products
        ?.findIndex(p => p.id === details.product.id && areEqualShallow(p.pivot?.data?.extra, details.product.pivot?.data?.extra))
      if (index >= 0) {
        state.purchasingCart.products.splice(index, 1)
      }

      state.purchasingCart.amount = state.purchasingCart.products.reduce((a, p) => {
        return a + (getProductPriceTag(p) * parseInt(p?.pivot?.data?.quantity ?? 1))
      }, 0)
      state.purchasingCart.updated_at = (new Date()).toISOString()
      localStorage.setItem('cart', JSON.stringify(state.purchasingCart))
    },

    changeQuantity (state, details) {
      const index = state.purchasingCart.products
        ?.findIndex(p => p.id === details.product.id && areEqualShallow(p.pivot?.data?.extra, details.product.pivot?.data?.extra))
      if (index >= 0) {
        state.purchasingCart.products[index].pivot.data.quantity = details.quantity
        state.purchasingCart.amount = state.purchasingCart.products.reduce((a, p) => {
          return a + (getProductPriceTag(p) * parseInt(p?.pivot?.data?.quantity ?? 1))
        }, 0)
      }
      localStorage.setItem('cart', JSON.stringify(state.purchasingCart))
    },

    loadCartFromStorage (state) {
      if (localStorage.getItem('cart')) {
        try {
          state.purchasingCart = JSON.parse(localStorage.getItem('cart'))
        } catch (e) {
          /* eslint-disable no-console */
          console.error(e)
          /* eslint-enable no-console */
        }
      }
    },

    updateCart (state, cart) {
      state.purchasingCart = cart
      localStorage.setItem('cart', JSON.stringify(state.purchasingCart))
    },

    resetCart (state) {
      state.purchasingCart = {
        products: [],
        amount: 0,
        currency: 1,
      }
      localStorage.setItem('cart', JSON.stringify(state.purchasingCart))
    },

    setLoading (state, loading) {
      state.loading = loading
    },
  },

  getters: {
    cart (state) {
      return state.purchasingCart
    },

    cartAmount (state) {
      return state.purchasingCart.amount
    },

    cartCurrency (state) {
      return state.purchasingCart.currency
    },

    isLoading (state) {
      return state.loading
    },

    cartShippingAmount (state) {
      return state.purchasingCart?.data?.shipping ?? state.defaultShipping
    },

    getProductsCountInCart (state) {
      return details => {
        const index = state.purchasingCart.products
          ?.findIndex(p => p.id === details.product.id && areEqualShallow(p.pivot?.data?.extra, details.extra))
        if (index >= 0) {
          return state.purchasingCart.products[index].pivot.data.quantity
        }

        return 0
      }
    },

  },
}
