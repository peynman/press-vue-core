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
    preProcessWidget (widget, renderer) {
      if (widget.props?.rules) {
        widget.props.rules = widget.props.rules.map(r => {
          if (typeof r === 'string') {
            switch (true) {
              case /required/.test(r):
                return this.getRequiredRule()
              case /requiredorzero/.test(r):
                return this.getRequiredOrZeroRule()
              case /email/.test(r):
                return this.getEmailRule()
              case /phone/.test(r):
                return this.getPhoneNumberRule()
              case /numeric/.test(r):
                return this.getNumericRule()
              case /min:\d*/.test(r):
                return this.getMinRule(r.substring('min:'.length))
              case /max:\d*/.test(r):
                return this.getMaxRule(r.substring('max:'.length))
              case /minlen:\d*/.test(r):
                return this.getMinLengthRule(r.substring('minlen:'.length))
              case /maxlen:\d*/.test(r):
                return this.getMaxLengthRule(r.substring('maxlen:'.length))
              }
          }
          return undefined
        }).filter(r => !!r)
      }
      if (widget.on) {
      }
      return widget
    },
  },
  computed: {
    widgetsDictionary () {
      return this.$press?.getRendererDictionary(this) ?? {}
    },
    rulesDictionary () {
      return this.$rpess?.getRendererRulesDictionary(this) ?? {}
    },
  },
}
