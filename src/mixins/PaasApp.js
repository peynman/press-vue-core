export default {
  created () {
    if (window.PageConfig) {
      const token = window.PageConfig.token
      if (token) {
        localStorage.setItem('api-token', token)
        this.$store.commit('setApiToken', token)
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        if (localStorage.getItem('api-token')) {
          this.$store.commit('setApiToken', localStorage.getItem('api-token'))
        }
      }
    }

    if (this.$store.getters.jwtToken) {
      if (localStorage.getItem('api-user')) {
        try {
          this.$store.commit('profile/setUser', JSON.parse(localStorage.getItem('api-user')))
        } catch (e) {
          /* eslint-disable no-console */
          console.error(e)
          /* eslint-enable no-console */
        }
      }
    }

    this.$store.commit('cart/loadCartFromStorage')
    this.$store.commit('admin/loadPages')

    if (this.$store.getters.jwtToken) {
      this.$store.dispatch('profile/fetchMe')
        .then(json => {
          this.$store.commit('profile/setUser', json)
          this.$store.dispatch('cart/onSignedIn')
        })
        .catch(error => {
          /* eslint-disable no-console */
          console.error(error)
          /* eslint-enable no-console */
          this.$store.commit('logout')
          this.$store.commit('snackbar/addMessage', {
            message: error.message,
            color: 'secondary',
            actionTitle: this.$t('components.admin.app.needRefreshTokenSignin'),
            actionColor: 'red',
            actionCallback: () => {
              this.$store.commit('openSigninDialog')
            },
          })
        })
    }
  },
}
