export default function ($component) {
  return {
    name: 'change-password',
    title: $component.$t('components.admin.crud.user.actions.changePassword'),
    icon: 'mdi-lock',
    batched: false,
    api: {
      method: 'POST',
      url: '/api/users/{id}',
      permission: 'users.update',
      form: [
      ],
    },
  }
}
