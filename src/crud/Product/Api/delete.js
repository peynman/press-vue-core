export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/products/{id}',
    permission: 'products.destroy',
  }
}
