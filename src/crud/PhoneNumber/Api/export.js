export default function ($t) {
  return {
    method: 'POST',
    url: '/api/phone-numbers/export',
    permission: 'phone-numbers.query',
  }
}
