export default $component => ({
  text: 'ZarinPal',
  value: 'zarinpal',
  schema: {
    children: [
      {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.title'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.title)',
      },
      {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.merchantId'),
          rules: [
            $component.getRequiredRule(),
          ],
        },
        'v-model': '$(bindings.merchantId)',
      },
      {
        tag: 'VTextField',
        props: {
          label: $component.$t('components.admin.crud.labels.email'),
        },
        'v-model': '$(bindings.email)',
      },
      {
        tag: 'VTextField',
        props: {
          type: 'number',
          label: $component.$t('components.admin.crud.labels.phone'),
        },
        'v-model': '$(bindings.mobile)',
      },
      {
        tag: 'VCheckbox',
        props: {
          label: 'is Zarin Gate',
        },
        'v-model': '$(bindings.isZarinGate)',
      },
      {
        tag: 'VCheckbox',
        props: {
          label: 'is Sandbox',
        },
        'v-model': '$(bindings.isSandbox)',
      },
    ],
  },
})
