import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import PhoneFlags from '../flags'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/phone-numbers/create',
    permission: 'phone-numbers.store',
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
        key: 'number',
        rules: [
          $component.getRequiredRule(),
          $component.getPhoneNumberRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            type: 'number',
            label: $component.$t('components.admin.crud.labels.phone'),
          },
        },
      },
      {
        key: 'data.type',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.phoneType'),
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
      {
        key: 'flags',
        component: {
          tag: 'BitwiseFlagsInput',
          props: {
            label: $component.$t('components.admin.crud.labels.flags'),
            items: PhoneFlags($component),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('BitwiseFlagsInput'),
          }),
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/phone-numbers',
          body: {
            user_id: values.user_id,
            number: values.number,
            flags: values.flags,
            data: values.data,
          },
        })
      }),
    ],
  }
}
