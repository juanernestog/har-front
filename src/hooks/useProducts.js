import useSWR from 'swr';

import { getProducts } from '../api/products';

export default function useProducts(page) {
  const { data, error } = useSWR(`/products?page=${page}`, getProducts);
  return {
    data: data?.data,
    meta: data?.meta,
    error,
    loading: !error && !data,
  };
}
