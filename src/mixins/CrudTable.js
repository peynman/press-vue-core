import FormValidations from './FormValidations'
import { recursiveCrudDefaultRelations } from '../utils/crud'

export const crudLoaderFunction = $component => (crud, page, limit, settings, filters, search) => {
  if (!$component.refId) {
    $component.refId = 1
  }

  $component.refId = $component.refId + 1
  const queryFilters = crud.api.query.getProcessedFilters?.(filters) ?? filters
  const sort = []
  if (settings.sortBy) {
    sort.push({
      column: settings.sortBy,
      direction: settings.sortDesc ? 'desc' : 'asc',
    })
  }

  return $component.$store.dispatch('apiCall', {
    url: crud.api.query.url,
    method: crud.api.query.method,
    body: {
      refId: $component.refId,
      page,
      limit,
      with: Object.keys(settings.loadRelations ?? {}).map(k => ({
        name: k,
        columns: settings.loadRelations[k],
      })),
      search,
      withTrashed: settings?.includeTrashed ?? false,
      filters: queryFilters,
      sort,
    },
  })
    .then(json => {
      return Promise.resolve(crud.onBeforeAdminTableView?.(json) ?? json)
    })
}

export default {
  name: 'CrudTable',
  mixins: [FormValidations([])],
  data: () => ({
    refId: 1,
  }),

  methods: {
    sendDeleteItemRequest (crud, item) {
      return this.$store.dispatch('apiCall', {
        method: 'DELETE',
        url: crud.api.delete.url.replace(`{${crud.primaryKey}}`, item[crud.primaryKey]),
      })
    },
    queryCrudResource (crud, page, limit, settings, filters, search) {
      return crudLoaderFunction(this)(crud, page, limit, settings, filters, search)
        .then(json => {
          if (this.refId === json.refId) {
            this.resetFormValidations()
            return Promise.resolve(json)
          }
        })
        .catch(error => {
          this.updateFormValidationErrors(error)
        })
    },
    saveSettings (crud, settings, callback) {
      localStorage.setItem('crud-settings-' + crud.name, JSON.stringify(settings))
      callback()
    },
    saveFilters (crud, filters, callback) {
      localStorage.setItem('crud-filters-' + crud.name, JSON.stringify(filters))
      callback()
    },
    getSavedSettings (crud) {
      const saved = localStorage.getItem('crud-settings-' + crud.name)
      if (saved) {
        return JSON.parse(saved)
      }

      return {
        loadRelations: recursiveCrudDefaultRelations(this.crud),
        perPage: 10,
        sortBy: 'id',
        sortDesc: true,
        hideColumns: ['deleted_at'],
      }
    },

    getSavedFilters (crud) {
      const saved = localStorage.getItem('crud-filters-' + crud.name)
      if (saved) {
        return JSON.parse(saved)
      }

      return {}
    },

    resetFilters (crud, call) {
      localStorage.removeItem('crud-filters-' + crud.name)
      call({})
    },

    resetSettings (crud, call) {
      localStorage.removeItem('crud-settings-' + crud.name)
      call({
        loadRelations: recursiveCrudDefaultRelations(this.crud),
        perPage: 10,
      })
    },
  },
}
