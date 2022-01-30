import { getCreateFormBindings, getFormValidationsAlert, getFormSubmitAction } from '../../../utils/crudForm'
import { imageUploadProperty } from '../../../utils/schemaHelpers'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/product-types',
    permission: 'product-types.store',
    bindings: [
      ...getCreateFormBindings([
      ]),
      {
        name: 'data',
        type: 'default',
        default: {
          content: null,
          title: null,
        },
      },
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert(),
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
        key: 'data.title',
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
        key: 'data.content',
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
        console.log(values)
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/product-types',
          body: {
            name: values.name,
            data: values.data,
          },
        })
      }),
    ],
  }
}
