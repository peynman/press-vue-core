export default function ($t) {
  return {
    method: 'POST',
    url: '/api/sms-mesages/export',
    permission: 'sms-mesages.query',
  }
}
