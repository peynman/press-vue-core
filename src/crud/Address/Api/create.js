import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/addresses/create',
    permission: 'addresses.store',
    bindings: [
      {
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getCreateFormBindings(),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert($component),
      {
        key: 'user_id',
        rules: [
          $component.getRequiredRule(),
          $component.getNumericRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            type: 'number',
            label: $component.$t('components.admin.crud.labels.targetUserId'),
            hint: $component.$t('components.admin.crud.hints.targetUserId'),
          },
        },
      },
      {
        key: 'province_code',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VAutocomplete',
          props: {
            label: $component.$t('components.admin.crud.labels.province'),
          },
        },
      },
      {
        key: 'city_code',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VAutocomplete',
          props: {
            label: $component.$t('components.admin.crud.labels.city'),
          },
        },
      },
      {
        key: 'address',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.address'),
          },
        },
      },
      {
        key: 'postal_code',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.postalCode'),
          },
        },
      },
      {
        key: 'data.type',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.emailType'),
          },
        },
      },
      {
        key: 'data.desc',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.description'),
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/addresses',
          body: {
            user_id: values.user_id,
            data: values.data,
          },
        })
      }),
    ],
  }
}
