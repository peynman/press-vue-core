export default {
  methods: {
    getSchemaChildrenForWidgets (widgets, props = {}) {
      return widgets?.filter(r => r.widget && this.widgetsDictionary[r.widget])
        .map(r => (
          {
            tag: 'VCol',
            props: {
              cols: r.cols?.xs ?? '12',
              ...(r.cols ?? {}),
            },
            children: [
              {
                tag: r.widget,
                props: {
                  api: r,
                  crud: this.crudName,
                  id: r.id,
                  ...props,
                },
                factory: this.widgetsDictionary[r.widget].factory,
              },
            ],
          }
        ))
    },
  },
  computed: {
    widgetsDictionary () {
      return this.$paas?.getRendererDictionary(this) ?? {}
    },
  },
}
