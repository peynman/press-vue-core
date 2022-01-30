export default function ($component) {
  return {
    method: 'POST',
    url: '/api/form-entries/query',
    permission: 'form-entries.query',
    form: [
    ],
  }
}
