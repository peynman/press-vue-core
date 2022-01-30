export default function ($t) {
  return {
    method: 'POST',
    url: '/api/chat-rooms/query',
    permission: 'chat-rooms.query',
    form: [
    ],
  }
}
