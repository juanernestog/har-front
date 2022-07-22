// useReview hook
import useSWR from 'swr';

import { /*createReview,*/ getReview, updateReview } from '../api/reviews';

export default function useReview() {
  const { data, error, mutate } = useSWR(`/`, getReview);

  async function update(payload) {
    const response = await updateReview(payload);

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
