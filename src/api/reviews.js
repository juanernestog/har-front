import http from './http';

function transformReview(item) {
  return {
    id: item?.cart._id,
    score: item?.score,
    comment: item?.comment,
  };
}

export function getReviews() {
  return http.get('/reviews').then((response) => {
    const { data: json } = response;
    return {
      data: json.data.map(transformReview),
    };
  });
}

export function getReview({ id }) {
  return http.get(`/reviews/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformReview(json.data),
    };
  });
}
//   return http.get(`/reviews/${id}`).then((response) => {
//     const { data: json } = response;
//     const transformedData = json.data.map((item) => {
//       return transformReview(item);
//     });
//     return {
//       data: transformedData,
//       meta: json.meta,
//     };
//   });
// }

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

export function deleteReview({ id }) {
  return http.delete(`/reviews/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformReview(json.data),
    };
  });
}
