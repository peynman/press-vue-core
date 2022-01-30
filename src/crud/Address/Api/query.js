export default function ($t) {
  return {
    method: 'POST',
    url: '/api/addresses/query',
    permission: 'addresses.query',
    form: [
    ],
  }
}
