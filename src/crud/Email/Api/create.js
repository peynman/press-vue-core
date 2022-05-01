import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import EmailFlags from '../flags'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/emails/create',
    permission: 'emails.store',
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
        key: 'email',
        rules: [
          $component.getRequiredRule(),
          $component.getEmailRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.email'),
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
      {
        key: 'flags',
        component: {
          tag: 'BitwiseFlagsInput',
          props: {
            label: $component.$t('components.admin.crud.labels.flags'),
            items: EmailFlags($component),
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
          url: '/api/emails',
          body: {
            user_id: values.user_id,
            email: values.email,
            flags: values.flags,
            data: values.data,
          },
        })
      }),
    ],
  }
}
