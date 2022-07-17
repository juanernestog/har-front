import http from './http';

function transformReview(item) {
  return {
    id: item?.cart._id,
    score: item?.score,
    comment: item?.comment,
  };
}

export function createReview(payload) {
  return http.post(`/reviews/`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformReview(json.data),
    };
  });
}

export function updateReview(payload) {
  const { id } = payload;
  return http.put(`/reviews/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformReview(json.data),
    };
  });
}
