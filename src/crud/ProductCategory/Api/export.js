export default function ($component) {
  return {
    method: 'POST',
    url: '/api/product-categories/export',
    permission: 'product-categories.query',
  }
}
