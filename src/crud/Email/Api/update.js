import { getEditFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import EmailFlags from '../flags'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/emails/{id}',
    permission: 'emails.update',
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
          method: 'PUT',
          url: `/api/emails/${values.id}`,
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
