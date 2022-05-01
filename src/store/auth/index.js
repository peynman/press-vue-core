export default {
  namespaced: true,

  state: {
    signup: {
      msgId: null,
    },
  },

  actions: {
    sendPhoneNumberVerifyCode (context, payload) {
      return context.dispatch('methodCall', {
        url: '/api/signup/sms/verify',
        method: 'POST',
        body: payload,
      }, { root: true })
        .catch(err => {
          if (!err.captcha) {
            context.dispatch('captcha/fetchCaptcha', null, { root: true })
          }
          return Promise.reject(err)
        })
    },
    verifyPhoneNumber (context, payload) {
      return context.dispatch('methodCall', {
        url: '/api/signup/sms/check/resolve',
        method: 'POST',
        body: payload,
      }, { root: true })
    },
    registerWithPhoneNumber (context, payload) {
      return context.dispatch('methodCall', {
        url: '/api/signup/sms/check/register',
        method: 'POST',
        body: payload,
      }, { root: true })
        .then(json => {
          context.commit('setApiToken', json.tokens.api, { root: true })
          context.commit('setApiReady', true, { root: true })
          context.commit('profile/setUser', json.user, { root: true })
          context.dispatch('cart/onSignedIn', null, { root: true })
          return Promise.resolve(json)
        })
    },
    resetWithPhoneNumber (context, payload) {
      return context.dispatch('methodCall', {
        url: '/api/signup/sms/check/reset',
        method: 'POST',
        body: payload,
      }, { root: true })
        .then(json => {
          context.commit('setApiToken', json.tokens.api, { root: true })
          context.commit('setApiReady', true, { root: true })
          context.commit('profile/setUser', json.user, { root: true })
          context.dispatch('cart/onSignedIn', null, { root: true })
          return Promise.resolve(json)
        })
    },
    signin (context, credentials) {
      return context.dispatch('methodCall', {
        url: '/api/signin',
        method: 'POST',
        body: credentials,
      }, { root: true })
        .then(json => {
          context.commit('setApiToken', json.tokens.api, { root: true })
          context.commit('setApiReady', true, { root: true })
          context.commit('profile/setUser', json.user, { root: true })
          context.dispatch('cart/onSignedIn', null, { root: true })
          return Promise.resolve(json)
        })
        .catch(err => {
          if (!err.captcha) {
            context.dispatch('captcha/fetchCaptcha', null, { root: true })
          }
          return Promise.reject(err)
        })
    },
    sendOTC (context, payload) {
      return context.dispatch('methodCall', {
        url: '/api/signin/send-otc',
        method: 'POST',
        body: payload,
      }, { root: true })
        .catch(err => {
          if (!err.captcha) {
            context.dispatch('captcha/fetchCaptcha', null, { root: true })
          }
          return Promise.reject(err)
        })
    },
    verifyOTC (context, payload) {
      return context.dispatch('methodCall', {
        url: '/api/signin/verify-otc',
        method: 'POST',
        body: payload,
      }, { root: true })
        .then(json => {
          context.commit('setApiToken', json.tokens.api, { root: true })
          context.commit('setApiReady', true, { root: true })
          context.commit('profile/setUser', json.user, { root: true })
          context.dispatch('cart/onSignedIn', null, { root: true })
          return Promise.resolve(json)
        })
        .catch(err => {
          if (!err.captcha) {
            context.dispatch('captcha/fetchCaptcha', null, { root: true })
          }
          return Promise.reject(err)
        })
    },
  },
}
