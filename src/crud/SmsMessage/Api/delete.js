export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/sms-mesages/{id}',
    permission: 'sms-mesages.destroy',
  }
}
