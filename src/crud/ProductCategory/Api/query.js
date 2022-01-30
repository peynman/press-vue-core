export default function ($component) {
  return {
    method: 'POST',
    url: '/api/product-categories/query',
    permission: 'product-categories.query',
    form: [
    ],
  }
}
