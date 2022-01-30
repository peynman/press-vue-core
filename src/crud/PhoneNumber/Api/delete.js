export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/phone-numbers/{id}',
    permission: 'phone-numbers.destroy',
  }
}
