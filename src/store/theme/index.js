import { mergeDeep } from '../../utils/helpers'
import Theme from './theme'

export default {
  namespaced: true,

  state: {
    theme: Theme,
  },

  mutations: {
    setTheme (state, theme) {
      state.theme = theme
    },
    appendTheme (state, theme) {
      state.theme = mergeDeep(state.theme, theme)
    },
  },

  getters: {
    theme (state) {
      return state.theme
    },
  },
}
