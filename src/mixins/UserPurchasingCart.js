import UserCartDetails from './UserCartDetails'

export default {
  name: 'UserPurchasingCart',
  mixins: [UserCartDetails],
  computed: {
    hasPurchasingCart () {
      return this.cartItemsCount > 0
    },
    cart () {
      return this.$store.getters['cart/cart']
    },
  },
}
