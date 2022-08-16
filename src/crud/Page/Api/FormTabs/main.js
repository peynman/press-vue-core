import { imageUploadProperty } from '../../../../utils/schemaHelpers'

export default $component => ([
    {
        key: 'slug',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.path'),
            hint: $component.$t('components.admin.crud.hints.path'),
          },
        },
    },
    {
        key: 'name',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.name'),
            hint: $component.$t('components.admin.crud.hints.name'),
          },
        },
    },
    {
        key: 'body.title',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.title'),
          },
        },
    },
    {
      key: 'zorder',
      component: {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.order'),
          type: 'number',
        },
      },
    },
    {
      key: 'body.content',
      component: {
        tag: 'VSchemaBuilder',
        props: {
          label: $component.$t('components.admin.crud.labels.content'),
          componentsDictionary: $component.$press?.getBuilderComponentsDictionary($component),
          customPropertyResolver: imageUploadProperty,
          rendererPreProcessor: $component.preProcessWidget,
        },
      },
    },
])
