import Themeable from './Themeable'

export default {
  mixins: [
    Themeable,
  ],
  data: vm => ({
    searchTerm: null,
    loading: false,
    products: [],
    page: 1,
    totalPages: 0,
    total: 0,
    refId: 0,
  }),
  computed: {
    perPage () {
      return this.limit || this.theme.website.shop.perPage
    },
  },
  methods: {
    onChangePage () {
      this.onDoSearch(this.searchTerm, this.page)
    },
    onSearchTerm () {
      if (this.searchTerm?.length >= 3 || !isNaN(parseInt(this.searchTerm))) {
        this.onDoSearch(this.searchTerm, 1)
      }
    },
    onLoadSearchNextPage () {
      this.onDoSearch(this.searchTerm, this.page + 1)
    },
    onDoSearch (term, page) {
      this.loading = true
      this.refId += 1
      this.$store.dispatch('repos/searchProducts', {
        term,
        refId: this.refId,
        page,
        limit: this.perPage,
      })
        .then(json => {
          this.products = json.items
          this.total = json.total
          this.page = json.currPage
          this.totalPages = Math.ceil(json.total / json.perPage)
          this.$store.dispatch('analytics/trackSiteSearch', {
            term,
            total: json.total,
          }, { root: true })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
