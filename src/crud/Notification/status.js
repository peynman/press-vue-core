export default $component => ([1, 2, 3, 4].map((i, index) => ({
  text: $component.$t('components.admin.crud.notification.status.' + i),
  value: i,
  color: ['primary', 'info', 'warning', 'success'][index % 4],
})))
