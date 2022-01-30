import { getCreateFormBindings, getFormValidationsAlert, getFormSubmitAction } from '../../../utils/crudForm'
import SchemaCrud from '../../PageSchema'
import { crudLoaderFunction } from '../../../mixins/CrudTable'
import ExtraJsonTypes from '../extraJsonTypes'
import { imageUploadProperty } from '../../../utils/schemaHelpers'

export default function ($component) {
  return {
    to: '/admin/pages/create',
    permission: 'pages.store',
    bindings: [
      {
        name: 'body',
        type: 'default',
        default: {
        },
      },
      {
        name: 'options',
        type: 'default',
        default: {
        },
      },
      ...getCreateFormBindings(),
    ],
    autoValidate: true,
    formTabs: [
      {
        value: 'general',
        text: $component.$t('components.admin.crud.tabs.general'),
      },
      {
        value: 'options',
        text: $component.$t('components.admin.crud.tabs.options'),
      },
      {
        value: 'customCodes',
        text: $component.$t('components.admin.crud.tabs.customCodes'),
      },
    ],
    form: [
      getFormValidationsAlert(),
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
        key: 'publish_at',
        tab: 'options',
        component: {
          tag: 'VTimestampInput',
          props: {
            label: $component.$t('components.admin.crud.labels.publishAt'),
          },
        },
      },
      {
        key: 'unpublish_at',
        tab: 'options',
        component: {
          tag: 'VTimestampInput',
          props: {
            label: $component.$t('components.admin.crud.labels.expiresAt'),
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
        key: 'options.author',
        tab: 'options',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.author'),
            clearable: true,
          },
        },
      },
      {
        key: 'options.description',
        tab: 'options',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.description'),
            clearable: true,
          },
        },
      },
      {
        key: 'options.schemaId',
        tab: 'options',
        rules: [
          $component.getNumericRule(),
        ],
        component: {
          tag: 'VCrudObjectPicker',
          props: {
            crud: SchemaCrud($component, 'user', 0),
            crudLoaderFunction: crudLoaderFunction($component),
            decorateLabel: '#:id :title',
            decorateMap: {
              id: 'id',
              title: 'schema.title',
            },
            label: $component.$t('components.admin.crud.labels.pageSchema'),
            hint: $component.$t('components.admin.crud.hints.pageSchema'),
            chips: true,
            smallChips: true,
          },
        },
      },
      {
        key: 'options.report_visits',
        tab: 'options',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.reportVisits'),
          },
        },
      },
      {
        key: 'options.report_filter',
        tab: 'options',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.reportFilter'),
          },
        },
      },
      {
        key: 'options.report_parameter',
        tab: 'options',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.reportParamter'),
          },
        },
      },
      {
        key: 'options.sources',
        tab: 'options',
        component: {
          tag: 'PageSourcesInput',
          props: {
            label: $component.$t('components.admin.crud.labels.pageSources'),
          },
          factory: () => $component.$press?.importAsyncComponent('PageSourcesInput'),
        },
      },
      {
        key: 'options.metas',
        tab: 'options',
        component: {
          tag: 'VJsonEditor',
          props: {
            label: $component.$t('components.admin.crud.labels.metas'),
            startType: 'array',
            canChangeRootType: false,
            hideDefaultTypes: true,
            extraTypes: ExtraJsonTypes($component),
          },
        },
      },
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
      {
        key: 'body.content',
        component: {
          tag: 'VSchemaBuilder',
          props: {
            label: $component.$t('components.admin.crud.labels.content'),
            extraTypes: $component.$press?.getRendererComponentsList($component),
            customPropertyResolver: imageUploadProperty,
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/pages',
          body: {
            body: values.body,
            options: values.options,
            slug: values.slug,
            name: values.name,
            publish_at: values.publish_at,
            unpublish_at: values.unpublish_at,
            zorder: values.zorder,
          },
        })
      }),
    ],
  }
}
