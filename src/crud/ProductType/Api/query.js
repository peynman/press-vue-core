export default function ($component) {
  return {
    method: 'POST',
    url: '/api/product-types/query',
    permission: 'product-types.query',
    form: [
      {
        key: 'created_at',
        component: {
          tag: 'VTimestampInput',
          props: {
          },
        },
      },
    ],
  }
}
