export default function ($t) {
  return {
    method: 'POST',
    url: '/api/wallet-transactions/query',
    permission: 'wallet-transactions.query',
    form: [
    ],
  }
}
