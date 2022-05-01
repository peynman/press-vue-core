import { getEditFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/addresses/{id}',
    permission: 'addresses.update',
    bindings: [
      ...getEditFormBindings(),
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
          method: 'PUT',
          url: `/api/addresses/${values.id}`,
          body: {
            user_id: values.user_id,
            data: values.data,
          },
        })
      }),
    ],
  }
}
