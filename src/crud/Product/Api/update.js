import { getEditFormBindings, getFormValidationsAlert, getFormSubmitAction } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/products/{id}',
    permission: 'products.update',
    bindings: [
      {
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getEditFormBindings(),
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
        key: 'data.fixedPrice',
        component: {
          tag: 'ProductFixedPriceInput',
          props: {
            label: $component.$t('components.admin.crud.labels.fixedPrice'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('ProductFixedPriceInput'),
          }),
        },
      },
      {
        key: 'data.periodicPrice',
        component: {
          tag: 'ProductPeriodicPriceInput',
          props: {
            label: $component.$t('components.admin.crud.labels.periodicPrice'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('ProductPeriodicPriceInput'),
          }),
        },
      },
      {
        key: 'publish_at',
        component: {
          tag: 'VTimestampInput',
          props: {
            label: $component.$t('components.admin.crud.labels.publishAt'),
          },
        },
      },
      {
        key: 'expires_at',
        component: {
          tag: 'VTimestampInput',
          props: {
            label: $component.$t('components.admin.crud.labels.expiresAt'),
          },
        },
      },
      {
        key: 'parent_id',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.productParentId'),
          },
        },
      },
      {
        key: 'group',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.sellGroup'),
          },
        },
      },
      {
        key: 'data.quantized',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.quantized'),
          },
        },
      },
      {
        key: 'data.maxQuantity',
        component: {
          tag: 'VTextField',
          props: {
            disabled: '$(!bindings.data.quantized)',
            type: 'number',
            label: $component.$t('components.admin.crud.labels.maxQuantity'),
          },
        },
      },
      {
        key: 'priority',
        component: {
          tag: 'VTextField',
          props: {
            type: 'number',
            label: $component.$t('components.admin.crud.labels.displayPriority'),
          },
        },
      },
      {
        key: 'categories',
        component: {
          tag: 'ProductCategoriesInput',
          props: {
            label: $component.$t('components.admin.crud.labels.categories'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('ProductCategoriesInput'),
          }),
        },
      },
      {
        key: 'data.types',
        component: {
          tag: 'ProductDetailsInput',
          props: {
            label: $component.$t('components.admin.crud.labels.productTypes'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('ProductDetailsInput'),
          }),
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: `/api/products/${values.id}`,
          body: {
            data: values.data,
            name: values.name,
            categories: values.categories?.map(c => (c.id)),
            types: values.data?.types?.types,
            publish_at: values.publish_at,
            expires_at: values.expires_at,
          },
        })
      }),
    ],
  }
}
