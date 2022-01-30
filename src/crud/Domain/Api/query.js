export default function ($t) {
  return {
    method: 'POST',
    url: '/api/domains/query',
    permission: 'domains.query',
    form: [
    ],
  }
}
