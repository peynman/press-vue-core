export default function ($t) {
  return {
    method: 'POST',
    url: '/api/bank-gateway-transactions/query',
    permission: 'bank-gateway-transactions.query',
    form: [
    ],
  }
}
