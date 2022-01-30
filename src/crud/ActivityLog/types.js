export default $component => (Object.keys($component.$t('components.admin.crud.activityLog.types')).map((i, index) => ({
  text: $component.$t('components.admin.crud.activityLog.types.' + i),
  value: parseInt(i),
  color: ['primary', 'warning', 'red', 'secondary'][index],
})))
