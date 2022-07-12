import useSWR from 'swr';

import { getCart, updateCart } from '../api/carts';

export default function useCart() {
  const { data, error, mutate } = useSWR(`/cart`, getCart);

  async function update(payload) {
    const response = await updateCart(payload);

    mutate(
      {
        data: data.data.map(function (item) {
          if (item.id === payload.id) {
            return response.data;
          }
          return item;
        }),
        meta: data.meta,
      },
      false,
    );
  }

  return {
    data: data?.data,
    error,
    loading: !error && !data,
    actions: {
      update,
    },
  };
}
