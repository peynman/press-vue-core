export default $component => ([
    {
        key: 'options.sitemap',
        tab: 'sitemap',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.sitemap'),
          },
        },
    },
    {
      key: 'options.sitmapChangeFreq',
      tab: 'sitemap',
      component: {
        tag: 'VSelect',
        props: {
          label: $component.$t('components.admin.crud.labels.changeFreq'),
          items: Object.entries($component.$t('components.admin.crud.labels.freq')).map(e => ({
            value: e[0],
            text: e[1],
          })),
        },
      },
    },
    {
      key: 'options.sitmapPriority',
      tab: 'sitemap',
      component: {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.priority'),
          type: 'number',
        },
      },
    },
])
