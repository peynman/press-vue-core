import Themeable from './Themeable'

export default {
  mixins: [Themeable],
  props: {
    value: Object,
    limit: Number,
  },
  data: vm => ({
    filters: vm.value ?? {},
    page: 1,
    totalPages: 0,
    total: 0,
    loading: false,
    products: [],
  }),
  watch: {
    page () {
      this.updateProductsList()
    },
    value () {
      this.filters = this.value ?? {}
      this.page = 1
      this.updateProductsList()
    },
  },
  computed: {
    perPage () {
      return this.limit || this.theme.website.shop.perPage
    },
  },
  methods: {
    updateProductsList () {
      this.loading = true
      this.$store.dispatch('repos/fetchProducts', {
        categories: Object.keys(this.filters?.categories ?? {})
          .filter(k => this.filters?.categories[k])
          .map(k => k),
        page: this.page,
        limit: this.perPage,
        sort: this.filters?.sort,
      })
        .then(json => {
          this.total = json.total
          this.page = json.currPage
          this.totalPages = Math.ceil(json.total / json.perPage)
          this.products = json.items
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
