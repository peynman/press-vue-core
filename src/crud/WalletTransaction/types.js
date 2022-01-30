export default $component => (Object.keys($component.$t('components.admin.crud.walletTransaction.types')).map(i => ({
  value: i,
  text: $component.$t('components.admin.crud.walletTransaction.types.' + i),
  color: ['warning', 'success', 'primary'][i],
})))
