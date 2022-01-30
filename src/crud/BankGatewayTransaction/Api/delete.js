export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/bank-gateway-transactions/{id}',
    permission: 'bank-gateway-transactions.destroy',
  }
}
