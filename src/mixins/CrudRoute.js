import { getCrudResourceFolderFromName } from '../utils/crud'

export default {
  name: 'CrudConsumer',
  props: {
    crudName: String,
  },
  data: () => ({
    crud: null,
  }),
  computed: {
    crudFolderName () {
      return getCrudResourceFolderFromName(this.crudName)
    },
    crudTranslationsKey () {
      return this.crudFolderName.charAt(0).toLowerCase() + this.crudFolderName.slice(1)
    },
  },

  watch: {
    crudName (n) {
      this.loadCrudDefinition(this.crudFolderName)
    },
  },

  mounted () {
    this.loadCrudDefinition(this.crudFolderName)
  },

  methods: {
    onCrudLoaded () {},
    loadCrudDefinition (name) {
      this.$press?.loadCrudWithName(name).then(c => {
        this.crud = c.default(this)
        this.$nextTick(() => {
          this.onCrudLoaded()
        })
      })
    },
  },
}
