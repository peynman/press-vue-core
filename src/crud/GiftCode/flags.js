export default $component => (Object.keys($component.$t('components.admin.crud.giftCode.flags')).map(i => ({
  value: i,
  text: $component.$t('components.admin.crud.giftCode.flags.' + i),
  color: ['warning'][i],
})))
