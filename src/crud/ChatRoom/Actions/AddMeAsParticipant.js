export default function ($component) {
  return {
    name: 'add-me-as-participant',
    title: $component.$t('components.admin.crud.chatRoom.actions.addMe'),
    icon: 'mdi-chat-plus',
    batched: false,
    component: {
      tag: 'ChatRoomEditDialog',
      props: {
        value: '$(bindings.item)',
        activator: '$(bindings.activator)',
        action: '$(bindings.action)',
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('ChatRoomEditDialog'),
      }),
    },
    api: {
      permission: 'chat-rooms.update',
    },
  }
}
