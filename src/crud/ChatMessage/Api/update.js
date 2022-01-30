import { getEditFormBindings, getFormSubmitAction } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/chat-messages/{id}',
    permission: 'chat-messages.update',
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
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: `/api/chat-messages/${values.id}`,
          body: {
          },
        })
      }),
    ],
  }
}
