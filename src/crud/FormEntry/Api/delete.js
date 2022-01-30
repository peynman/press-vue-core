export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/form-entries/{id}',
    permission: 'form-entries.destroy',
  }
}
