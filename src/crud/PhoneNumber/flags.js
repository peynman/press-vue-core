export default $component => {
  return [1, 2].map(f => ({
    text: $component.$t('components.admin.crud.phoneNumber.flags.' + f),
    value: f,
    color: f === 1 ? 'success' : 'secondary',
    dark: true,
  }))
}
