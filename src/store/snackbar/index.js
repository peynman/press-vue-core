import { makeRandomId } from '../../utils/helpers'

export default {
  namespaced: true,

  state: {
    messages: [],
  },

  mutations: {
    addMessage (state, { message, color, actionTitle, actionColor, actionCallback }) {
      state.messages.push({
        __id: makeRandomId(),
        message,
        color,
        actionTitle,
        actionColor,
        actionCallback,
        visible: true,
      })
    },
  },

  getters: {
    messages (state) {
      return state.messages
    },
  },
}
