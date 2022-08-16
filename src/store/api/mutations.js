export function setApiHostname (hostname) {
  state.apiHostname = hostname
}

export function setApiToken (state, token) {
  state.api = token
  if (token) {
    localStorage.setItem('api-token', state.api)
  }
}

export function updateApiTimestamp (state) {
  state.apiTimestamp = (new Date()).getTime()
  localStorage.setItem('api-timestamp', state.apiTimestamp)
}

export function logout (state) {
  state.api = null
  localStorage.removeItem('api-token')
  localStorage.removeItem('api-user')
  localStorage.removeItem('api-timestamp')
}

export function openSigninDialog (state) {
  state.loginDialog = true
}

export function closeSigninDialog (state) {
  state.loginDialog = false
}

export function setApiReady (state, ready) {
  state.apiReady = ready
}
