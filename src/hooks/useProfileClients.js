import useSWR from 'swr';
import { getClient } from '../api/clients';

export default function useProfile({ id }) {
  const { data, error } = useSWR(id ? `/clients/${id}` : null, () =>
    getClient({ id }),
  );

  return {
    data: data?.data,
    error,
    loading: !error && !data,
  };
}
