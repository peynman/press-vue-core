export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/sms-gateways/{id}',
    permission: 'sms-gateways.destroy',
  }
}
