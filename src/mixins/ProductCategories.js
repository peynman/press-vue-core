export default {
  data: vm => ({
    categoriesList: [],
  }),
  computed: {
    categoriesById () {
      const iterate = function (list) {
        return list?.reduce((dic, c) => {
          return { ...dic, [c.id]: c, ...iterate(c.children) }
        }, {}) ?? {}
      }
      return this.categoriesList.reduce((dic, c) => {
        return { ...dic, [c.id]: c, ...iterate(c.children) }
      }, {})
    },
  },
  methods: {
    getProductCategoriesHeirarchy (filter) {
      return this.$store.dispatch('repos/fetchProductCategories').then(categories => {
        this.categoriesList = categories
        return Promise.resolve(categories
          .filter(filter)
          .sort((a, b) => parseInt(a.data?.order ?? a.id) - parseInt(b.data?.order ?? b.id))
          .reduce((arr, c) => {
            if (c.parent_id) {
              const parentIndex = arr.findIndex(s => s.id === c.parent_id)
              if (parentIndex >= 0) {
                if (!arr[parentIndex].children) {
                  arr[parentIndex].children = []
                }
                arr[parentIndex].children.push({ ...c })
              }
            } else {
              arr.push({ ...c })
            }
            return arr
          }, [])
          .map(c => ({
            object: c,
            id: c.id,
            title: c.data.title,
            icon: c.data.icon,
            to: '/shop/category/' + c.id,
            order: 1000 + c.data.order,
            data: c.data,
            children: c.children?.sort((a, b) => parseInt(a.data?.order ?? a.id) - parseInt(b.data?.order ?? b.id))
              .filter(filter)
              .map(cc => ({
                object: cc,
                id: cc.id,
                title: cc.data.title,
                icon: cc.data.icon,
                data: cc.data,
                order: cc.data.order,
                to: '/shop/category/' + cc.id,
                children: cc.children?.sort((a, b) => parseInt(a.data?.order ?? a.id) - parseInt(b.data?.order ?? b.id))
                  .filter(filter)
                  .map(ccc => ({
                    object: ccc,
                    id: ccc.id,
                    title: ccc.data.title,
                    icon: ccc.data.icon,
                    order: ccc.data.order,
                    data: ccc.data,
                    to: '/shop/category/' + ccc.id,
                  })) ?? [],
              })) ?? [],
          }))
        )
      })
    },
  },
}
