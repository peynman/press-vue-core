export default $component => ({
  text: 'SMS.ir Simple',
  value: 'smsir_simple',
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
          label: $component.$t('components.admin.crud.labels.secretKey'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.secret_key)',
      },
      {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.lineNumber'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.line_number)',
      },
    ],
  },
})
