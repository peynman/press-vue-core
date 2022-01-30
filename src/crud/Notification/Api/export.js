export default function ($t) {
  return {
    method: 'POST',
    url: '/api/notifications/export',
    permission: 'notifications.query',
  }
}
