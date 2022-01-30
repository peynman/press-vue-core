export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/notifications/{id}',
    permission: 'notifications.destroy',
  }
}
