import useSWR from 'swr';

import { getProducts, updateProduct } from '../api/products';

export default function useProducts() {
  const { data, error, mutate } = useSWR(`/products`, getProducts);

  async function update(payload) {
    const response = await updateProduct(payload);

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
