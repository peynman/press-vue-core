export default function ($t) {
  return {
    method: 'POST',
    url: '/api/notifications/query',
    permission: 'notifications.query',
    form: [
    ],
  }
}
