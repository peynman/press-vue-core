export default $component => ([
    {
        key: 'options.report_visits',
        tab: 'reports',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.reportVisits'),
          },
        },
    },
    {
        key: 'options.report_filter',
        tab: 'reports',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.reportFilter'),
          },
        },
    },
    {
        key: 'options.report_parameter',
        tab: 'reports',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.reportParamter'),
          },
        },
    },
])
