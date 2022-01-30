export default $component => {
  return [1, 2].map(f => ({
    text: $component.$t('components.admin.crud.smsMessage.flags.' + f),
    value: f,
    color: 'secondary',
    dark: true,
  }))
}
