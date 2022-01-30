export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/bank-gateways/{id}',
    permission: 'bank-gateways.destroy',
  }
}
