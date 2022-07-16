import useSWR from 'swr';

import { getCartItems, updateCartItem } from '../api/cartItems';

export default function useCartItems() {
  const { data, error, mutate } = useSWR(`/cartItems`, getCartItems);

  async function update(payload) {
    const response = await updateCartItem(payload);

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
