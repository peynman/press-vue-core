export default function ($t) {
  return {
    method: 'POST',
    url: '/api/sms-gateways/export',
    permission: 'sms-gateways.query',
  }
}
