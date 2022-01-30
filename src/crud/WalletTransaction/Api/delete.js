export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/wallet-transactions/{id}',
    permission: 'wallet-transactions.destroy',
  }
}
