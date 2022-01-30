export default $component => ([1, 2].map(i => ({
  value: i,
  text: $component.$t('components.admin.crud.giftCode.types.' + i),
})))
