import User from './User'

export default {
  mixins: [User],
  computed: {
    cartItems () {
      return this.cart?.products ?? []
    },
    cartGiftCode () {
      return this.cart?.data?.gift_code
    },
    cartPromotions () {
      return this.cart?.data?.promotions ?? []
    },
    cartItemsCount () {
      return this.cartItems.length
    },
    cartAmount () {
      return parseFloat(this.cart?.amount ?? 0) - this.cartShippingAmount + this.cartGiftAmount
    },
    cartTotalAmount () {
      return parseFloat(this.cart?.amount ?? 0)
    },
    cartCurrency () {
      return parseInt(this.cart?.currency)
    },
    cartGiftAmount () {
      return parseFloat(this.cartGiftCode?.amount ?? 0)
    },
    cartPromotionsAmount () {
      return this.cartPromotions?.reduce((tt, n) => (tt + parseFloat(n.amount)), 0)
    },
    cartShippingAmount () {
      return parseFloat(this.cart?.data?.delivery_price ?? 0)
    },
    cartAddress () {
      return this.authUser?.addresses?.find(a => a.id === this.cart?.data?.delivery_address_id)
    },
    cartDeliveryAgent () {
      return this.cartAvailableDeliveryAgents?.find(a => a.value === this.cart?.data?.delivery_agent)
    },
    cartAvailableDeliveryAgentNames () {
      return this.cart?.data?.delivery_agent_names ?? []
    },
    cartAvailableDeliveryAgents () {
      return this.$press?.getAvailableDeliveryAgents(this)
        .filter(a => this.cartAvailableDeliveryAgentNames.includes(a.value)) ?? []
    },
    cartAmountString () {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.cartAmount, 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](this.cartCurrency),
      })
    },
    cartShippingAmountString () {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.cartShippingAmount, 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](this.cartCurrency),
      })
    },
    cartTotalAmountString () {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.cartTotalAmount, 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](this.cartCurrency),
      })
    },
    cartGiftAmountString () {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.cartGiftAmount, 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](this.cartCurrency),
      })
    },
    cartPromotionsAmountString () {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.cartPromotionsAmount, 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](this.cartCurrency),
      })
    },
  },
}
