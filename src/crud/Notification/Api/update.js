import { getEditFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import Flags from '../flags'
import Status from '../status'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/notifications/{id}',
    permission: 'notifications.update',
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
        key: 'title',
        rules: [
          $component.getRequiredRule(),
          $component.getEmailRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.title'),
          },
        },
      },
      {
        key: 'status',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VSelect',
          props: {
            label: $component.$t('components.admin.crud.labels.status'),
            items: Status($component),
          },
        },
      },
      {
        key: 'message',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.message'),
          },
        },
      },
      {
        key: 'flags',
        component: {
          tag: 'BitwiseFlagsInput',
          props: {
            label: $component.$t('components.admin.crud.labels.flags'),
            items: Flags($component),
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
