export default $component => (Object.keys($component.$t('components.admin.crud.bankGatewayTransaction.status')).map((i, index) => ({
  text: $component.$t('components.admin.crud.bankGatewayTransaction.status.' + i),
  value: parseInt(i),
  color: ['secondary', 'secondary', 'info', 'warning', 'error', 'success'][index],
})))
