export default {
  namespaced: true,

  state: {
  },

  actions: {
    likeProduct (context, id) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: `/api/product-reviews/update`,
        body: {
          product_id: id,
          reaction: 'liked',
        },
      }, { root: true })
    },

    unlikeProduct (context, id) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: `/api/product-reviews/update`,
        body: {
          product_id: id,
          reaction: null,
        },
      }, { root: true })
    },

    addProductReview (context, { id, message, stars, data }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: `/api/product-reviews/add`,
        body: {
          product_id: id,
          review: message,
          stars,
          data,
        },
      }, { root: true })
    },

    updateProductReview (context, { id, reviewId, message, stars, data }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: `/api/product-reviews/edit/${reviewId}`,
        body: {
          product_id: id,
          review: message,
          stars,
          data,
        },
      }, { root: true })
    },

    fillProductContactForm (context, { userId, id, size, name, color }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/form-entries/fill',
        body: {
          form_name: 'product-notify',
          data: {
            user_id: userId,
            prod_id: id,
            size,
            name,
            color,
          },
        },
      }, { root: true })
    },

    modifyCategories (context, { categories, productIds, mode }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/products/modify-categories',
        body: {
          categories,
          productIds,
          mode,
        },
      }, { root: true })
    },
  },
}
