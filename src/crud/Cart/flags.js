export default $component => (Object.keys($component.$t('components.admin.crud.cart.flags')).map(i => ({
  value: parseInt(i),
  text: $component.$t('components.admin.crud.cart.flags.' + i),
  color: 'secondary',
})))
