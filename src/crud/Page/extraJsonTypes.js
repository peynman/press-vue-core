export default $component => ([
  {
    value: 'metatag',
    text: 'Meta Tag',
    form: [
      {
        tag: 'VTextField',
        'v-model': '$(bindings.name)',
        props: {
          label: 'Meta name',
        },
      },
      {
        tag: 'VTextField',
        'v-model': '$(bindings.value)',
        props: {
          label: 'Meta value',
        },
      },
    ],
    genNewItem (values) {
      return {
        name: values.name,
        value: values.value,
      }
    },
  },
])
