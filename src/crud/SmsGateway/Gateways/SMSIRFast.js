export default $component => ({
  text: 'SMS.ir Fast',
  value: 'smsir_fast',
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
          label: $component.$t('components.admin.crud.labels.templateId'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.template_id)',
      },
    ],
  },
})
