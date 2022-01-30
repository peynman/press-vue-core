export default function ($component) {
  return {
    method: 'POST',
    url: '/api/products/export',
    permission: 'products.query',
  }
}
