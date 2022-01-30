export default $component => {
  return Object.keys($component.$t('components.admin.crud.bankGateway.flags')).map(f => ({
    text: $component.$t('components.admin.crud.bankGateway.flags.' + f),
    value: parseInt(f),
    color: f === 1 ? 'red' : 'secondary',
    dark: true,
  }))
}
