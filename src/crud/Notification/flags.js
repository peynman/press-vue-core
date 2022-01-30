export default $component => {
  return [1, 2, 4].map(f => ({
    text: $component.$t('components.admin.crud.notification.flags.' + f),
    value: f,
    color: f === 1 ? 'success' : 'secondary',
    dark: true,
  }))
}
