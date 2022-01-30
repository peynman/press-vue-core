export default function ($t) {
  return {
    method: 'POST',
    url: '/api/addresses/export',
    permission: 'addresses.query',
  }
}
