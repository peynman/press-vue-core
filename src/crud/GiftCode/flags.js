export default $component => ([1].map(i => ({
  value: i,
  text: $component.$t('components.admin.crud.giftCode.flags.' + i),
  color: ['warning'][i],
})))
