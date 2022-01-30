export default $component => ([1, 2, 3, 4].map((i, index) => ({
  text: $component.$t('components.admin.crud.smsMessage.status.' + i),
  value: i,
  color: ['warning', 'info', 'red', 'success'][index % 4],
})))
