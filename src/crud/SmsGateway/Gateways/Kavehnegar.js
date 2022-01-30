export default $component => ({
  text: 'Kavenegar',
  value: 'kavehnegar',
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
          label: $component.$t('components.admin.crud.labels.lineNumber'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.number)',
      },
    ],
  },
})
