export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/gift-codes/{id}',
    permission: 'gift-codes.destroy',
  }
}
