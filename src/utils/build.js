module.exports = {
  isProduction () {
    return process.env.NODE_ENV === 'production'
  },
  shouldUseLoader () {
    return parseInt(process.env.VUE_APP_VUETIFY_LOADER)
  },
  isLibraryBuild () {
    return process.env.VUE_BUILD_MODE === 'lib'
  },
}
