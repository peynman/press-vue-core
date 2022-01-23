export default {
  computed: {
    searchParams () {
      const url = new URL(window.location.href)
      return url.searchParams
    },
    hasAlert () {
      return this.searchParams.get('type')
    },
    alertType () {
      return this.searchParams.get('type')
    },
    alertMessage () {
      return this.searchParams.get('alert')
    },
    alertColor () {
      switch (this.alertType) {
        case 'error':
          return 'red'
        case 'success':
          return 'green'
        case 'warning':
          return 'warning'
      }

      return null
    },
  },
}
