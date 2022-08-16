export default {

  namespaced: true,

  state: {
    roles: null,
    domains: null,
    permissions: null,
    productCategories: null,
    productTypes: null,
    smsGateways: null,
    forms: null,

    promises: {
      roles: null,
      domains: null,
      permissions: null,
      productCategories: null,
      productTypes: null,
      smsGateways: null,
      forms: null,
    },
    loading: {
      roles: false,
      domains: false,
      permissions: false,
      productCategories: false,
      productTypes: false,
      smsGateways: false,
      forms: false,
    },
  },

  actions: {
    fetchObject (context, { id, name }) {
      return context.dispatch('apiCall', {
        method: 'GET',
        url: `/api/${name}/${id}`,
      }, { root: true })
    },

    fetchRoles (context) {
      if (context.state.roles) {
        return Promise.resolve(context.state.roles)
      }

      if (context.state.promises.roles) {
        return context.state.promises.roles
      }

      context.state.loading.roles = true
      context.state.promises.roles = context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: 'Larapress\\CRUD\\Repository\\IRoleRepository',
          method: 'getVisibleRoles',
          path: 'roles',
        },
      ], { root: true }).then(repos => {
        context.state.roles = repos.roles
        return Promise.resolve(repos.roles)
      }).finally(() => {
        context.state.loading.roles = false
      })

      return context.state.promises.roles
    },

    fetchDomains (context) {
      if (context.state.domains) {
        return Promise.resolve(context.state.domains)
      }

      if (context.state.promises.domains) {
        return context.state.promises.domains
      }

      context.state.loading.domains = true
      context.state.promises.domains = context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: 'Larapress\\Profiles\\Repository\\Domain\\IDomainRepository',
          method: 'getVisibleDomains',
          path: 'domains',
        },
      ], { root: true }).then(repos => {
        context.state.domains = repos.domains
        return Promise.resolve(repos.domains)
      }).finally(() => {
        context.state.loading.roles = false
      })

      return context.state.promises.domains
    },

    fetchPermissions (context) {
      if (context.state.permissions) {
        return Promise.resolve(context.state.permissions)
      }

      if (context.state.promises.permissions) {
        return context.state.promises.permissions
      }

      context.state.loading.permissions = true
      context.state.promises.permissions = context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: 'Larapress\\CRUD\\Repository\\IPermissionsRepository',
          method: 'getVisiblePermissions',
          path: 'permissions',
        },
      ], { root: true }).then(repos => {
        context.state.permissions = repos.permissions
        return Promise.resolve(repos.permissions)
      }).finally(() => {
        context.state.loading.permissions = false
      })

      return context.state.promises.permissions
    },

    fetchProductTypes (context) {
      if (context.state.productTypes) {
        return Promise.resolve(context.state.productTypes)
      }

      if (context.state.promises.productTypes) {
        return context.state.promises.productTypes
      }

      context.state.loading.productTypes = true
      context.state.promises.productTypes = context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Product\\IProductRepository',
          method: 'getProductTypes',
          path: 'types',
        },
      ], { root: true }).then(repos => {
        context.state.productTypes = repos.types
        return Promise.resolve(repos.types)
      }).finally(() => {
        context.state.loading.productTypes = false
      })

      return context.state.promises.productTypes
    },

    fetchProductCategories (context) {
      if (context.state.productCategories) {
        return Promise.resolve(context.state.productCategories)
      }

      if (context.state.promises.productCategories) {
        return context.state.promises.productCategories
      }

      context.state.loading.productCategories = true
      context.state.promises.productCategories = context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Product\\IProductRepository',
          method: 'getRootProductCategories',
          path: 'categories',
        },
      ], { root: true }).then(repos => {
        context.state.productCategories = repos.categories
        return Promise.resolve(repos.categories)
      }).finally(() => {
        context.state.loading.productCategories = false
      })

      return context.state.promises.productCategories
    },

    fetchProducts (context, filters) {
      return context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Product\\IProductRepository',
          method: 'getProductsPaginated',
          path: 'products',
          args: [
            {
              index: 0, // page
              value: filters?.page ?? 0,
            },
            {
              index: 1, // limit
              value: filters?.limit ?? 5,
            },
            {
              index: 2, // categories
              value: filters?.categories ?? [],
            },
            {
              index: 3, // types
              value: [1],
            },
            {
              index: 4, // sort by
              type: 'string',
              value: filters?.sort ?? null,
            },
          ],
        },
      ], { root: true })
        .then(json => {
          return Promise.resolve(json.products)
        })
    },

    searchProducts (context, { term, refId, limit, page }) {
      return context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Product\\IProductRepository',
          method: 'searchProductsPaginated',
          path: 'products',
          args: [
            {
              index: 0,
              type: 'string',
              value: term,
            },
            {
              index: 1,
              value: page,
            },
            {
              index: 2,
              value: limit,
            },
            {
              index: 3, // categories
              value: [],
            },
            {
              index: 4, // types
              value: [1],
            },
          ],
        },
      ], { root: true })
        .then(json => {
          return Promise.resolve(json.products)
        })
    },

    fetchProductDetails (context, { id }) {
      return context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Product\\IProductRepository',
          method: 'getProductDetails',
          path: 'product',
          args: [
            {
              index: 1,
              value: id,
            },
          ],
        },
      ], { root: true })
        .then(json => {
          return Promise.resolve(json.product)
        })
    },

    fetchProductReviews (context, { id, page }) {
      return context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\ECommerce\\Services\\Product\\IProductRepository',
          method: 'getProductReviews',
          path: 'reviews',
          args: [
            {
              index: 1,
              value: id,
            },
            {
              index: 2,
              value: page,
            },
          ],
        },
      ], { root: true })
        .then(json => {
          return Promise.resolve(json.reviews)
        })
    },

    fetchSmsGateways (context) {
      if (context.state.smsGateways) {
        return Promise.resolve(context.state.smsGateways)
      }

      if (context.state.promises.smsGateways) {
        return context.state.promises.smsGateways
      }

      context.state.loading.smsGateways = true
      context.state.promises.smsGateways = context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\Notifications\\Repository\\ISMSGatewayRepository',
          method: 'getSMSGateways',
          path: 'gateways',
        },
      ], { root: true }).then(repos => {
        context.state.smsGateways = repos.gateways
        return Promise.resolve(repos.gateways)
      }).finally(() => {
        context.state.loading.smsGateways = false
      })

      return context.state.promises.smsGateways
    },

    fetchForm (context, formId) {
      return context.dispatch('fetchSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\Profiles\\Repository\\Form\\IFormRepository',
          method: 'getForm',
          path: 'form',
          args: [
            {
              index: 0,
              type: 'request',
            },
            {
              index: 1,
              type: 'route',
            },
            {
              index: 2,
              value: formId,
            }
          ]
        },
      ], { root: true }).then(repos => {
        return Promise.resolve(repos.form)
      })
    },

    fetchForms (context) {
      if (context.state.forms) {
        return Promise.resolve(context.state.forms)
      }

      if (context.state.promises.forms) {
        return context.state.promises.forms
      }

      context.state.loading.forms = true
      context.state.promises.forms = context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\Profiles\\Repository\\Form\\IFormRepository',
          method: 'getFillableForms',
          path: 'forms',
          args: []
        },
      ], { root: true }).then(repos => {
        context.state.forms = repos.forms
        return Promise.resolve(repos.forms)
      }).finally(() => {
        context.state.loading.forms = false
      })
    }

  },

  getters: {
    isRolesLoading (state) {
      return state.loading.roles
    },
    isDomainsLoading (state) {
      return state.loading.roles
    },
    isPermissionsLoading (state) {
      return state.loading.permissions
    },
    isProductCategoriesLoading (state) {
      return state.loading.productCategories
    },
    isProductTypesLoading (state) {
      return state.loading.productTypes
    },
    isSmsGatewaysLoading (state) {
      return state.loading.smsGateways
    },
    isFormsLoading (state) {
      return state.loading.smsGateways
    },
  },
}
