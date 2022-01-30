export default function ($component) {
  return {
    method: 'POST',
    url: '/api/page-schemas/export',
    permission: 'page-schemas.query',
  }
}
