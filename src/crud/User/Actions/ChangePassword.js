export default function ($component) {
  return {
    name: 'change-password',
    title: $component.$t('components.admin.crud.user.actions.changePassword'),
    icon: 'mdi-lock',
    batched: true,
    api: {
      method: 'PUT',
      url: '/api/users/{id}',
      permission: 'users.update',
      form: [
      ],
    },
  }
}
