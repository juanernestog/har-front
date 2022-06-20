import useSWR from 'swr';
import { getProducer } from '../api/producers';

export default function useProfile(id) {
  const { data, error } = useSWR(id ? `/producers/${id}` : null, () =>
    getProducer(id),
  );

  return {
    data: data?.data,
    error,
    loading: !error && !data,
  };
}
