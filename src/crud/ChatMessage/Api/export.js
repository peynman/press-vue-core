export default function ($t) {
  return {
    method: 'POST',
    url: '/api/chat-rooms/export',
    permission: 'chat-rooms.query',
  }
}
