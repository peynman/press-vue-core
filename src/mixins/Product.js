import { mapGetters } from 'vuex'
import { getProductCategories, getProductCateogiesMaxOffPercent, getProductFixedPrice, getProductPriceTag } from '../utils/productHelpers'

export default {
  data: vm => ({
    size: null,
    color: null,
    quantity: 1,
  }),
  computed: {
    ...mapGetters('banking', [
      'currenciesById',
    ]),
    product () {
      return this.value
    },
    productId () {
      return this.product?.id
    },
    productTitle () {
      return this.product?.data?.title
    },
    productTypes () {
      return this.product?.types ?? []
    },
    productCategories () {
      return getProductCategories(this.product)
    },
    maxProductCategoryOffPercent () {
      return getProductCateogiesMaxOffPercent(this.product)
    },
    headerImages () {
      return this.product?.data?.types?.images?.header
    },
    headerImagesCount () {
      return this.headerImages?.length
    },
    carouselImagesSorted () {
      return [...(this.product?.data?.types?.images?.slides ?? [])]
        .filter(a => a.width >= 512)
        .sort((a, b) => (parseInt(a.index) - parseInt(b.index)))
    },
    carouselImages () {
      return this.carouselImagesSorted.map(slide => ({
          ...slide,
          image: slide.image?.startsWith('http') ? slide.image : this.$store.getters.getUrl(slide.image),
      }))
    },
    carouselImagesCount () {
      return this.carouselImages?.length
    },
    fixedPrice () {
      return getProductFixedPrice(this.product)
    },
    fixedPriceAmount () {
      return getProductPriceTag(this.product)
    },
    periodicPrice () {
      return this.product?.data?.periodicPrice
    },
    periodicPriceAmount () {
      return parseInt(this.periodicPrice?.amount)
    },
    offAmount () {
      if (this.maxProductCategoryOffPercent > 0) {
        return parseInt(this.fixedPrice?.amount)
      } else {
        return parseInt(this.fixedPrice?.offAmount)
      }
    },
    fixedPriceString () {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.fixedPriceAmount, 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](parseInt(this.fixedPrice?.currency)),
      })
    },
    offAmountString () {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.offAmount, 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](parseInt(this.fixedPrice?.currency)),
      })
    },
    productAvailableStockCount () {
      return this.productAvailableStock?.reduce((c, i) => (c + parseInt(i.stock)), 0)
    },
    productAvailableStock () {
      return this.product?.data?.types?.cellar?.inventory
    },
    productAvailableSizeStock () {
      return this.productAvailableStock?.filter((s, index) => this.productAvailableStock?.findIndex(ss => ss.size === s.size) === index)
    },
    productAvailableColorStock () {
      return this.productAvailableStock?.filter((c, index) => this.productAvailableStock?.findIndex(cc => cc.name === c.name) === index)
    },
    productAvailableColorsForPick () {
      if (this.size) {
        const avColors = this.productAvailableStock?.filter(c => c.size === this.size)
        return avColors.filter((c, index) => avColors.findIndex(cc => cc.name === c.name) === index)
      }

      return this.productAvailableColorStock
    },
    productAvailableSizesForPick () {
      if (this.color) {
        const avSizes = this.productAvailableStock?.filter(c => c.name === this.color)
        return avSizes.filter((s, index) => avSizes.findIndex(ss => ss.size === s.size) === index)
      }

      return this.productAvailableSizeStock
    },
    productPickedItemInStock () {
      return this.productAvailableStock?.filter(
        s => (s.name === this.color && s.size === this.size)
      )?.[0]
    },
    productPickedItemInStockCount () {
      return parseInt(this.productPickedItemInStock?.count ?? 0)
    },
    pickedLabel () {
      if (this.size && this.color) {
        const cindex = this.productAvailableStock?.findIndex(c => c.name === this.color)
        if (cindex >= 0) {
          return this.$t('components.website.productCard.pickedLabel', {
            size: this.size,
            color: this.productAvailableStock[cindex].name,
          })
        }
      }

      return this.$t('components.website.productCard.pickLabel')
    },
    pickedColor () {
      const cindex = this.productAvailableStock?.findIndex(c => c.name === this.color)
      if (cindex >= 0) {
        return this.productAvailableStock[cindex]
      }
      return null
    },
    pickedColorHex () {
      return this.pickedColor?.color ?? ''
    },
    pickedColorName () {
      return this.pickedColor?.name ?? ''
    },
    pickedItemId () {
      const cindex = this.productAvailableStock?.findIndex(c => c.name === this.color && c.size === this.size)
      return cindex >= 0 ? this.productAvailableStock[cindex].itemId : ''
    },
    pickedParentId () {
      const cindex = this.productAvailableStock?.findIndex(c => c.name === this.color && c.size === this.size)
      return cindex >= 0 ? this.productAvailableStock[cindex].parentId : ''
    },
    productIsPickedItemInStock () {
      return this.productPickedItemInStock?.stock - this.$store.getters['cart/getProductsCountInCart']({
        product: this.product,
        extra: {
          color: this.pickedColorHex,
          size: this.size,
          name: this.pickedColorName,
          itemId: this.pickedItemId,
          parentId: this.pickedParentId,
        },
      }) >= this.quantity
    },
    productRibbon () {
      const asRibbon = this.productCategories?.find(c => c.data?.showAsProductBadge)
      if (asRibbon) {
        return {
          type: 'boxribbon boxribbon-top-right',
          color: asRibbon.data.backColor,
          content: asRibbon.data.title,
          textColor: asRibbon.data.textColor,
          fontSize: asRibbon.data.fontSize,
        }
      }
      return this.product?.data?.types?.ribbon
    },
    productRibbonType () {
      return this.productRibbon?.type
    },
    productRibbonColor () {
      return this.productRibbon?.color
    },
    productRibbonContent () {
      return this.productRibbon?.content
    },
    productRibbonTextColor () {
      return this.productRibbon?.textColor
    },
    productRibbonFontSize () {
      return this.productRibbon?.fontSize
    },
    productDescriptionContent () {
      return this.product?.data?.types?.descriptive?.content
    },
    productDescriptionSchema () {
      return this.product?.data?.types?.descriptive?.schema
    },
    productHasDescription () {
      return this.product?.types?.map(t => t.name).includes('descriptive')
    },
    productGuide () {
      return this.product?.data?.types?.cellar?.guide
    },
  },

  methods: {
    getProductInStockCount (product, color, size) {
      return parseInt(product?.data?.types?.cellar?.inventory?.filter(
        s => (s.name === color && s.size === size)
      )?.[0]?.stock ?? 0)
    },
    getProductPriceStringForQuantity (quantity) {
      return this.$t('components.website.productCard.price', {
        amount: this.$n(this.fixedPriceAmount * parseInt(quantity), 'decimal'),
        currency: this.$store.getters['banking/getCurrencyTitle'](parseInt(this.fixedPrice?.currency)),
      })
    },
    getImageIndexWithColor (c) {
      const color = this.productAvailableColorStock.find(s => s.name === c)
      if (color) {
        return this.carouselImages.findIndex(i => i.ref === color.ref)
      }
      return null
    },
    getProductIdentityImage (color) {
      if (color) {
        const index = this.getImageIndexWithColor(color)
        if (index >= 0) {
          return this.getImageThumbnail(this.carouselImages?.[index]?.image, 2)
        }
      }

      return this.carouselImages?.[0]?.image
    },
    getImageThumbnail (img, level = 0) {
      if (level === 0 || !img) {
        return img
      }

      const appender = '_' + Array.from(Array(level).keys()).map(i => 'x').join('')
      const dotIndex = img.lastIndexOf('.')
      const url = img.slice(0, dotIndex)
      const mime = img.slice(dotIndex)
      return `${url}${appender}${mime}`
    },
  },
}
