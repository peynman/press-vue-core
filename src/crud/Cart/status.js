export default $component => (Object.keys($component.$t('components.admin.crud.cart.status')).map(i => ({
  value: parseInt(i),
  text: $component.$t('components.admin.crud.cart.status.' + i),
  color: ['warning', 'primary', 'success'][i - 1],
})))
