import { getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'

export default function ($component) {
  return {
    name: 'ChangePassword',
    title: $component.$t('components.admin.crud.user.actions.changePassword'),
    icon: 'mdi-lock',
    batched: false,
    api: {
      method: 'POST',
      url: '/api/users/{id}/update-password',
      autoValidate: true,
      permission: 'users.update-password',
      title: $component.$t('components.admin.crud.user.actions.changePassword'),
      form: [
        getFormValidationsAlert($component),
        {
          key: 'password',
          rules: [
            $component.getRequiredRule(),
          ],
          component: {
            tag: 'VTextField',
            props: {
              label: $component.$t('components.admin.crud.labels.password'),
            },
          },
        },
        {
          key: 'password_confirmation',
          rules: [
            $component.getRequiredRule(),
          ],
          component: {
            tag: 'VTextField',
            props: {
              label: $component.$t('components.admin.crud.labels.password_confirmation'),
            },
          },
        },
      ],
      actions: [
        getFormSubmitAction($component, values => {
          return $component.$store.dispatch('apiCall', {
            method: 'POST',
            url: `/api/users/${values.item.id}/update-password`,
            body: {
              password: values.password,
              password_confirmation: values.password_confirmation,
            },
          })
        }),
      ],
    },
  }
}
