export default function ($t) {
  return {
    method: 'POST',
    url: '/api/wallet-transactions/export',
    permission: 'wallet-transactions.query',
  }
}
