export default function ($t) {
  return {
    method: 'POST',
    url: '/api/bank-gateways/export',
    permission: 'bank-gateways.query',
  }
}
