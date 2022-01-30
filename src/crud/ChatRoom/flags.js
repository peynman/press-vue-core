export default $component => (Object.keys($component.$t('components.admin.crud.chatRoom.flags')).map(i => ({
  value: i,
  text: $component.$t('components.admin.crud.chatRoom.flags.' + i),
  color: 'secondary',
})))
