export default function ($t) {
  return {
    method: 'POST',
    url: '/api/bank-gateways/query',
    permission: 'bank-gateways.query',
    form: [
    ],
  }
}
