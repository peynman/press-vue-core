export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/product-categories/{id}',
    permission: 'product-categories.destroy',
  }
}
