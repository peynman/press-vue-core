export default function ($t) {
  return {
    method: 'POST',
    url: '/api/bank-gateway-transactions/export',
    permission: 'bank-gateway-transactions.query',
  }
}
