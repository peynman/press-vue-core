export default function ($t) {
  return {
    method: 'POST',
    url: '/api/phone-numbers/query',
    permission: 'phone-numbers.query',
    form: [
    ],
  }
}
