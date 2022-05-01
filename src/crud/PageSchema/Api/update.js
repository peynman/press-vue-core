import { getEditFormBindings, getFormValidationsAlert, getFormSubmitAction } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/page-schemas/{id}',
    permission: 'page-schemas.update',
    bindings: [
      {
        name: 'schema',
        type: 'default',
        default: {},
      },
      ...getEditFormBindings(),
    ],
    autoValidate: true,
    formTabs: [
      {
        value: 'general',
        text: $component.$t('components.admin.crud.tabs.general'),
      },
      {
        value: 'customCodes',
        text: $component.$t('components.admin.crud.tabs.customCodes'),
      },
    ],
    form: [
      getFormValidationsAlert($component),
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
        key: 'schema.title',
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
        key: 'schema.js',
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
        key: 'schema.html',
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
        key: 'schema.theme',
        component: {
          tag: 'ThemeInput',
          props: {
            label: $component.$t('components.admin.crud.labels.theme'),
          },
          factory: () => $component.$press?.importAsyncComponent('ThemeInput'),
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: `/api/page-schemas/${values.id}`,
          body: {
            schema: values.schema,
            name: values.name,
          },
        })
      }),
    ],
  }
}
