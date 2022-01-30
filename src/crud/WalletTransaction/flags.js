export default $component => (Object.keys($component.$t('components.admin.crud.walletTransaction.flags')).map(i => ({
  value: i,
  text: $component.$t('components.admin.crud.walletTransaction.flags.' + i),
  color: 'secondary',
})))
