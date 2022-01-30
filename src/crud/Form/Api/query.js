export default function ($component) {
  return {
    method: 'POST',
    url: '/api/forms/query',
    permission: 'forms.query',
    form: [
    ],
  }
}
