export default function ($t) {
  return {
    method: 'POST',
    url: '/api/domains/export',
    permission: 'domains.query',
  }
}
