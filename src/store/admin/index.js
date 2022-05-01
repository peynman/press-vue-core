import { makeRandomId } from '../../utils/helpers'

export default {
  namespaced: true,

  state: {
    pages: [],
  },

  mutations: {
    addPage (state, { name, title, icon }) {
      state.pages.push({
        name,
        title,
        icon,
        widgets: [],
      })

      localStorage.setItem('admin-widgets', JSON.stringify(state.pages))
    },
    updatePage (state, { name, title, icon }) {
      const index = state.pages.findIndex(p => p.name === name)
      if (index >= 0) {
        state.pages[index] = {
          name,
          title,
          icon,
        }
        localStorage.setItem('admin-widgets', JSON.stringify(state.pages))
      }
    },
    removePage (state, name) {
      const index = state.pages.findIndex(p => p.name === name)
      if (index >= 0) {
        state.pages.splice(index, 1)
        localStorage.setItem('admin-widgets', JSON.stringify(state.pages))
      }
    },
    addWidgetToPage (state, { name, widget }) {
      const index = state.pages.findIndex(p => p.name === name)
      if (index >= 0) {
        if (!state.pages[index].widgets) {
          state.pages[index].widgets = []
        }
        state.pages[index].widgets.push({
          ...widget,
          id: makeRandomId(10),
        })
        localStorage.setItem('admin-widgets', JSON.stringify(state.pages))
      }
    },
    removeWidgetFromPage (state, id) {
      const index = state.pages.findIndex(p => p.widgets.findIndex(w => w.id === id) >= 0)
      if (index >= 0) {
        const wIndex = state.pages[index].widgets.findIndex(w => w.id === id)
        if (wIndex >= 0) {
          state.pages[index].widgets.splice(wIndex, 1)
          localStorage.setItem('admin-widgets', JSON.stringify(state.pages))
        }
      }
    },
    loadPages (state) {
      const s = localStorage.getItem('admin-widgets')
      if (s) {
        try {
          state.pages = JSON.parse(s)
        } catch (e) {
          state.pages = []
        }
      }
    },
  },

  getters: {
    pages (state) {
      return state.pages
    },
  },
}
