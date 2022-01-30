export default function ($t) {
  return {
    method: 'POST',
    url: '/api/sms-gateways/query',
    permission: 'sms-gateways.query',
    form: [
    ],
  }
}
