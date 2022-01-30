import {
  getFormValidationsAlert,
  getFormSubmitAction,
  getEditFormBindings,
  getFormSpacerAction,
  getEditFormPrevObjectAction,
  getEditFormNextObjectAction,
} from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/product-categories/{id}',
    permission: 'product-categories.update',
    bindings: [{
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getEditFormBindings(),
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
        key: 'parent_id',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.productParentId'),
            hint: $component.$t('components.admin.crud.hints.productParentId'),
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
        key: 'data.displayPriority',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.displayPriority'),
          },
        },
      },
      {
        key: 'data.icon',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.icon'),
          },
        },
      },
      {
        key: 'data.backColor',
        component: {
          tag: 'VColorPickerInput',
          props: {
            label: $component.$t('components.admin.crud.labels.backColor'),
          },
        },
      },
      {
        key: 'data.textColor',
        component: {
          tag: 'VColorPickerInput',
          props: {
            label: $component.$t('components.admin.crud.labels.textColor'),
          },
        },
      },
      {
        key: 'data.offPercent',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.offPercent'),
            type: 'number',
            clearable: true,
          },
        },
      },
      {
        key: 'data.showOnProductCard',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.showOnProductCard'),
          },
        },
      },
      {
        key: 'data.queryFrontEnd',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.queryFrontEnd'),
          },
        },
      },
      {
        key: 'data.isFilterable',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.isFilterable'),
          },
        },
      },
      {
        key: 'data.showInFrontFilters',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.showInFrontFilters'),
          },
        },
      },
      {
        key: 'data.showAsProductBadge',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.showAsProductBadge'),
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: '/api/product-categories/' + values.id,
          body: {
            name: values.name,
            parent_id: values.parent_id,
            data: values.data,
          },
        })
      }),
      getFormSpacerAction(),
      getEditFormPrevObjectAction(),
      getEditFormNextObjectAction(),
    ],
  }
}
