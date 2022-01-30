export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/emails/{id}',
    permission: 'emails.destroy',
  }
}
