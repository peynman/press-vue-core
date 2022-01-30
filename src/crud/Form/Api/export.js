export default function ($component) {
  return {
    method: 'POST',
    url: '/api/forms/export',
    permission: 'forms.query',
  }
}
