export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/forms/{id}',
    permission: 'forms.destroy',
  }
}
