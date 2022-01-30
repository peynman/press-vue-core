export default function ($t) {
  return {
    method: 'POST',
    url: '/carts/export',
    permission: 'carts.query',
  }
}
