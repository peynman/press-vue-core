export function methodCall (context, { url, method, body, headers }) {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-console */
    console.log(body)
    /* eslint-enable no-console */
  }
  return fetch(context.getters.getUrl(url), {
    mode: process.env.VUE_APP_API_FETCH_MODE,
    method,
    headers: { ...context.getters.apiHeaders, ...headers },
    body: JSON.stringify(body),
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else if (response.status >= 400 && response.status < 500) {
      return response.json().then(json => {
        json.status = response.status
        /* eslint-disable no-console */
        console.log('json error', json)
        /* eslint-enable no-console */
        throw json
      })
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  })
  .then(response => response.json())
}

export function apiCall (context, { url, method, body, headers }) {
  return context.dispatch('readyApi').then(() => {
    return this.dispatch('methodCall', { url, method, body, headers })
  })
}

export function readyApi (context) {
  if (context.state.apiReady) {
    return Promise.resolve()
  }

  if (context.state.apiPromise) {
    return context.state.apiPromise
  }

  const timestamp = (new Date()).getTime()
  if (timestamp >= context.getters.apiTimestamp + 1800000) {
    context.state.apiPromise = context.dispatch('methodCall', {
      url: '/api/signin/refresh-token',
      method: 'POST',
    }).then(json => {
      context.commit('setApiToken', json.tokens.api)
      context.commit('setApiReady', true)
      context.commit('updateApiTimestamp')
      return Promise.resolve()
    })
    return context.state.apiPromise
  } else {
    return Promise.resolve()
  }
}

export function fetchSources (context, sources) {
  return context.dispatch('methodCall', {
    url: '/api/repos',
    method: 'POST',
    body: {
      sources,
    },
  })
}

export function fetchApiSources (context, sources) {
  return context.dispatch('apiCall', {
    url: '/api/repos',
    method: 'POST',
    body: {
      sources,
    },
  })
}

export function logout (context) {
  context.commit('logout')
  context.commit('profile/setUser', null)
  context.commit('captcha/setCaptcha', null)
  return Promise.resolve()
}
