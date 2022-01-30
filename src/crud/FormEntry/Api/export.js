export default function ($component) {
  return {
    method: 'POST',
    url: '/api/form-entries/export',
    permission: 'form-entries.query',
  }
}
