import { getProductPriceTag, getProductCategories } from '../../utils/productHelpers'

function appendGlobalContext(_paq, context) {
    const user = context.rootGetters['profile/user']
    if (context.rootGetters.isLoggedIn && user?.id) {
        const highestRole = user.roles?.sort((a, b) => a.priority - b.priority)?.[0] ?? null
        _paq.push(['setUserId', user.id])
        if (highestRole) {
            _paq.push(['setCustomDimension', customDimensionId = 1, customDimensionValue = role.name]);
        }
    } else {
        _paq.push(['setCustomDimension', customDimensionId = 1, customDimensionValue = 'guest']);
    }
    if (context.getters.dimensions) {
        Object.keys(context.getters.dimensions).forEach(dimId => {
            _paq.push(['setCustomDimension', customDimensionId = dimId, customDimensionValue = context.getters.dimensions[dimId]])
        })
    }
}

export default {
    namespaced: true,

    state: {
        dimensions: {},
    },

    actions: {
        trackPageVisit(context) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['setReferrerUrl', document.referrer])
                    _paq.push(['setCustomUrl', window.location.href])
                    _paq.push(['setDocumentTitle', document.title])
                    appendGlobalContext(_paq, context)
                    _paq.push(['trackPageView'])
                }
            })
        },

        trackUserLogout (context) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['resetUserId'])
                    // we also force a new visit to be created for the pageviews after logout
                    _paq.push(['appendToTrackingUrl', 'new_visit=1'])
                    appendGlobalContext(_paq, context)
                    _paq.push(['trackPageView'])
                    // we finally make sure to not again create a new visit afterwards (important for Single Page Applications)
                    _paq.push(['appendToTrackingUrl', ''])
                }
            })
        },

        trackSiteSearch (context, { term, total }) {
            return Promise.resolve(() => {
                if (window._paq) {
                    window._paq.push(['trackSiteSearch',
                        // Search keyword searched for
                        term,
                        // Search category selected in your search engine. If you do not need this, set to false
                        false,
                        // Number of results on the Search results page. Zero indicates a 'No Result Search Keyword'. Set to false if you don't know
                        total
                    ])
                }
            })
        },

        trackProductView (context, product) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['setEcommerceView',
                        product.id, // (Required) productSKU
                        product.data?.title, // (Optional) productName
                        getProductCategories(product)?.categories?.map(c => c.data.title), // (Optional) categoryName
                        getProductPriceTag(product) // (Optional) price
                    ]);
                    _paq.push(['trackPageView']);
                }
            })
        },

        trackProductCategoryView (context, productCategory) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['setEcommerceView',
                        false, // Product name is not applicable for a category view.
                        false, // Product SKU is not applicable for a category view.
                        productCategory, // (Optional) Product category, or array of up to 5 categories
                    ]);
                    _paq.push(['trackPageView']);
                }
            })
        },

        trackCartAddItem (context, { cart, product, details }) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['addEcommerceItem',
                        product.name, // (Required) productSKU
                        product.data?.title, // (Optional) productName
                        getProductCategories(product)?.categories?.map(c => c.data.title), // (Optional) categoryName
                        getProductPriceTag(product), // (Optional) price
                        details?.quantity ?? 1, // (Optional) quantity - Defaults to 1)
                    ])
                    _paq.push(['trackEcommerceCartUpdate', cart.amount])
                }
            })
        },

        trackCartRemoveItem (context, { cart, productName }) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['removeEcommerceItem',
                        productName, // (Required) productSKU
                    ])
                    _paq.push(['trackEcommerceCartUpdate', cart.amount])
                }
            })
        },


        trackCartAmount (context, { cart }) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['trackEcommerceCartUpdate', cart.amount])
                }
            })
        },

        trackCartCleared (context) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['clearEcommerceCart'])
                }
            })
        },

        trackCartOrderCompleted (context, { cart }) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['trackEcommerceOrder',
                        cart.id, // (Required) orderId
                        cart.amount, // (Required) grandTotal (revenue)
                        0, // (Optional) subTotal
                        0, // (optional) tax
                        0, // (optional) shipping
                        0 // (optional) discount
                    ]);
                }
            })
        },

        trackGoalConversion(context, { goalId, revenue }) {
            return Promise.resolve(() => {
                if (window._paq) {
                    _paq.push(['trackGoal', goalId, revenue]);
                }
            })
        },
    },

    mutations: {
        setDimentionValue(state, { dimId, value }) {
            state.dimensions[dimId] = value
        },
    },

    getters: {
        dimensions (state) {
            return state.dimensions
        },
    },
}