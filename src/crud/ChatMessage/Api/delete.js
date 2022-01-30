export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/chat-rooms/{id}',
    permission: 'chat-rooms.destroy',
  }
}
