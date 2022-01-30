export default $component => {
  return [1].map(f => ({
    text: $component.$t('components.admin.crud.smsGateway.flags.' + f),
    value: f,
    color: f === 1 ? 'red' : 'secondary',
    dark: true,
  }))
}
