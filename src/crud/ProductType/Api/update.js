import {
  getFormValidationsAlert,
  getFormSubmitAction,
  getEditFormBindings,
} from '../../../utils/crudForm'
import { imageUploadProperty } from '../../../utils/schemaHelpers'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/product-types/{id}',
    permission: 'product-types.update',
    bindings: [
      ...getEditFormBindings([]),
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
            componentsDictionary: $component.$press?.getBuilderComponentsDictionary($component),
            customPropertyResolver: imageUploadProperty,
            rendererPreProcessor: $component.preProcessWidget,
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        console.log(values)
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: '/api/product-types/' + values.id,
          body: {
            name: values.name,
            data: values.data,
          },
        })
      }),
    ],
  }
}
