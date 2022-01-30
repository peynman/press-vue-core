export default function ($t) {
  return {
    method: 'POST',
    url: '/api/gift-codes/export',
    permission: 'gift-codes.query',
  }
}
