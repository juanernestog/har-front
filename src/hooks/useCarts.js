import useSWR from 'swr';

import { getCarts, updateCarts } from '../api/carts';

export default function useCarts() {
  const { data, error, mutate } = useSWR(`/carts`, getCarts);

  async function update(payload) {
    const response = await updateCarts(payload);

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
