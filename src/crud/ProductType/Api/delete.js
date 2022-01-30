export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/product-types/{id}',
    permission: 'product-types.destroy',
  }
}
