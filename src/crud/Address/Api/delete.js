export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/addresses/{id}',
    permission: 'addresses.destroy',
  }
}
