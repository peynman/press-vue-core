export default function ($t) {
  return {
    method: 'POST',
    url: '/api/gift-codes/query',
    permission: 'gift-codes.query',
    form: [
    ],
  }
}
