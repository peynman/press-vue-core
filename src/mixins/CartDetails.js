import TimestampFormatter from './TimestampFormatter'

export default {
  mixins: [TimestampFormatter],
  computed: {
    cartTitle () {
      return this.$t('components.website.cartItem.title', {
        id: this.$n(this.cart?.id, 'decimal'),
      })
    },
    cartPurchaseTimestamp () {
      return this.getRelativeTimestamp(this.cart?.data?.period_start)
    },
    cartPurchaseTimestampString () {
      return this.$t('components.website.cartItem.timestamp', {
        timestamp: this.cartPurchaseTimestamp,
      })
    },
    cartStatusList () {
      return this.$press?.getAvailableCartStatuses(this)
    },
    cartStatus () {
      return this.cartStatusList.find(s => s.value === this.cart?.status)
    },
    cartStatusString () {
      return this.cartStatus?.text
    },
    cartStatusColor () {
      return this.cartStatus?.color
    },
    cartBranchStatus () {
      return this.cart?.data?.synced ? this.$t('components.website.cartItem.sentToBranch') : this.$t('components.website.cartItem.notSentToBranch')
    },
    cartBranchStatusColor () {
      return this.cart?.data?.synced ? 'success' : 'secondary'
    },
    cartPostStatus () {
      return this.cart?.data?.posted_at ? this.$t('components.website.cartItem.sentByBranch', {
        timestamp: this.getRelativeTimestamp(this.cart?.data?.posted_at),
      }) : this.$t('components.website.cartItem.notSentByBranch')
    },
    cartPostStatusColor () {
      return this.cart?.data?.posted_at ? 'success' : 'secondary'
    },
  },
}
