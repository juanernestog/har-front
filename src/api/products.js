import http from './http';

function transformProduct(item) {
  return {
    id: item._id,
    name: item.name,
    quantity: item.quantity,
    category: item.category,
    price: item.price,
    producer: {
      name: item.userId.name,
    },
    createdAt: item.createdAt,
  };
}

export function getProduct({ id }) {
  return http.get(`/products/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformProduct(json.data),
    };
  });
}

export function createProduct({ content }) {
  return http.post(`/products`, { content }).then((response) => {
    const { data: json } = response;
    return {
      data: transformProduct(json.data),
    };
  });
}

export function updateProduct(payload) {
  const { id } = payload;
  return http.put(`/products/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformProduct(json.data),
    };
  });
}
