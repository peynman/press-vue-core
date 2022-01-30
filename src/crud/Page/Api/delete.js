export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/pages/{id}',
    permission: 'pages.destroy',
  }
}
