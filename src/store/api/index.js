import {
  setApiToken,
  logout as mutateLogout,
  openSigninDialog,
  closeSigninDialog,
  setApiReady,
  updateApiTimestamp,
} from './mutations'

import {
  apiCall,
  fetchSources,
  readyApi,
  methodCall,
  fetchApiSources,
  logout as actionLogout,
} from './actions.js'

import {
  getUrl,
  apiHeaders,
  authHeader,
  jwtToken,
  shouldOpenSigninDialog,
  isLoggedIn,
  getWebsiteUrl,
  apiTimestamp,
} from './getters.js'

export default {
  namespaced: false,

  state: {
    apiPromise: null,
    apiHostname: null,
    apiReady: false,
    loginDialog: false,
    apiTimestamp: null,
    api: null,
    language: null,
    avLangugages: [],
  },

  actions: {
    apiCall,
    fetchSources,
    readyApi,
    methodCall,
    fetchApiSources,
    logout: actionLogout,
  },

  mutations: {
    setApiToken,
    logout: mutateLogout,
    openSigninDialog,
    closeSigninDialog,
    setApiReady,
    updateApiTimestamp,
  },

  getters: {
    authHeader,
    jwtToken,
    apiHeaders,
    getUrl,
    shouldOpenSigninDialog,
    isLoggedIn,
    getWebsiteUrl,
    apiTimestamp,
  },
}
