import User from './User'

export default {
  mixins: [User],
  computed: {
    product () {
      return this.value
    },
    aggregatedRating () {
      return parseFloat(this.product?.rating?.rating ?? 0)
    },
    ratingsCount () {
      return parseInt(this.product?.rating?.rates_count ?? 0)
    },
    isFavorited () {
      return this.product?.liked?.data?.reaction?.includes('liked') ?? false
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
      if (this.isFavorited) {
        return this.$store.dispatch('product/unlikeProduct', this.product.id).then(r => {
          this.product.liked = null
        })
      } else if (this.product) {
        return this.$store.dispatch('product/likeProduct', this.product.id).then(r => {
          this.$set(this.product, 'liked', r)
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
