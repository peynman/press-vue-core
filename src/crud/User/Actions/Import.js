export default function ($component) {
  return {
    name: 'import',
    title: $component.$t('components.admin.crud.user.actions.import'),
    icon: 'mdi-upload',
    batched: true,
    api: {
      method: 'POST',
      url: '/api/users/import',
      permission: 'users.store',
      form: [
        {
          key: 'file',
          rules: ['required'],
          components: {
            tag: 'VFileInput',
            props: {
              label: $component.$t(''),
            },
          },
        },
      ],
    },
  }
}
