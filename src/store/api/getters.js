export function jwtToken (state) {
  return state.api
}

export function authHeader (state, getters) {
  return {
    Authorization: `Bearer ${getters.jwtToken}`,
  }
}

export function getBaseUrl (state) {
  return state.apiHostname !== null ? state.apiHostname :
        process.env.VUE_APP_API_BASE_URL === undefined ? window.location.origin
    : `${process.env.VUE_APP_API_BASE_URL_SCHEMA}${process.env.VUE_APP_API_BASE_URL}`
}

export function getWebsiteUrl () {
  return url => {
    return window.location.origin + url
  }
}

export function getUrl (state) {
  return url => {
    return `${getBaseUrl(state)}${url}`
  }
}

export function apiHeaders (state, getters) {
  return {
    ...getters.authHeader,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

export function apiTimestamp (state) {
  return state.apiTimestamp
}

export function shouldOpenSigninDialog (state) {
  return state.loginDialog
}

export function isLoggedIn (state) {
  return state.api !== null
}
