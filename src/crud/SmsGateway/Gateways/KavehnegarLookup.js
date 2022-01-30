export default $component => ({
  text: 'Kavenegar Lookup',
  value: 'kavehnegar_lookup',
  schema: {
    children: [
      {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.apiKey'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.api_key)',
      },
      {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.templateId'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.template)',
      },
    ],
  },
})
