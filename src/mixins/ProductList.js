import Themeable from './Themeable'

export default {
  mixins: [Themeable],
  props: {
    filters: {
      type: Object,
      default: () => ({}),
    },
    limit: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data: vm => ({
    totalPages: 0,
    total: 0,
    loading: false,
    products: [],
    internalPage: vm.page,
  }),
  watch: {
    page () {
      this.internalPage = this.page
      this.$nextTick(() => {
        this.updateProductsList()
      })
    },
    filters () {
      this.$nextTick(() => {
        this.updateProductsList()
      })
    },
  },
  computed: {
    perPage () {
      return this.limit
    },
  },
  methods: {
    updateProductsList () {
      this.loading = true
      return this.$store.dispatch('repos/fetchProducts', {
        categories: Object.keys(this.filters?.categories ?? {})
          .filter(k => this.filters?.categories[k])
          .map(k => k),
        page: this.page,
        limit: this.perPage,
        sort: this.filters?.sort,
      })
        .then(json => {
          if (json.currPage === this.page) {
            this.total = json.total
            this.internalPage = json.currPage
            this.totalPages = Math.ceil(json.total / json.perPage)
            this.products = json.items
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
