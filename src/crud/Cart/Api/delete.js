export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/carts/{id}',
    permission: 'carts.destroy',
  }
}
