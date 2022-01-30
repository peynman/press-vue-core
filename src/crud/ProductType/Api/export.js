export default function ($component) {
  return {
    method: 'POST',
    url: '/api/product-types/export',
    permission: 'product-types.query',
  }
}
