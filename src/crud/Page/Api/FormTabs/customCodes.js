export default $component => ([
    {
        key: 'options.js',
        tab: 'customCodes',
        component: {
          tag: 'CodeEditor',
          props: {
            label: $component.$t('components.admin.crud.labels.jsCode'),
          },
          factory: () => $component.$press?.importAsyncComponent('CodeEditor'),
        },
    },
    {
        key: 'options.html',
        tab: 'customCodes',
        component: {
          tag: 'CodeEditor',
          props: {
            label: $component.$t('components.admin.crud.labels.htmlCode'),
          },
          factory: () => $component.$press?.importAsyncComponent('CodeEditor'),
        },
    },
])