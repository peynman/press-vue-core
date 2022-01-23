import User from './User'

export default {
  mixins: [User],
  computed: {
    product () {
      return this.value
    },
    overalRating () {
      return this.product?.overalRating
    },
    isFavorited () {
      const index = this.product?.reviews?.findIndex(r => r.author_id === this.authUser?.id)
      if (index >= 0) {
        return this.product?.reviews[index].data?.reaction?.includes('liked')
      } else {
        return false
      }
    },
    hasSentReview () {
      return this.productReviews?.filter(r => r.author_id === this.authUser?.id).length > 0
    },
    productReviews () {
      return this.product?.reviews?.filter(r => r.message) ?? []
    },
  },
  methods: {
    changeProductRating () {
    },
    toggleProductFavorite () {
      const index = this.product?.reviews?.findIndex(r => r.author_id === this.authUser?.id)
      if (index >= 0) {
        return this.$store.dispatch('product/unlikeProduct', this.product.id).then(r => {
          this.product.reviews.splice(index, 1)
        })
      } else if (this.product) {
        return this.$store.dispatch('product/likeProduct', this.product.id).then(r => {
          if (!this.product.reviews) {
            this.$set(this.product, 'reviews', [])
          }
          this.product.reviews.push(r)
          return Promise.resolve(r)
        })
      }
    },
    submitReview (message, stars, data) {
      return this.$store.dispatch('product/addProductReview', {
        id: this.product?.id,
        message,
        stars,
        data,
      }).then(r => {
        if (!this.product.reviews) {
          this.$set(this.product, 'reviews', [])
        }
        this.product.reviews.push(r)
        return Promise.resolve(r)
      })
    },
    loadPaginatedReviews (page) {
      return this.$store.dispatch('repos/fetchProductReviews', {
        page,
        id: this.product?.id,
      })
    },
  },
}
