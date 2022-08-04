import http from './http';

export function transformProduct(item) {
  return {
    id: item._id,
    name: item.name,
    quantity: item.quantity,
    category: item.category,
    price: item.price,
    unit: item.unit,
    picture: {
      ...item.picture,
      path: item.picture?.path
        ? `${process.env.REACT_APP_SERVER_URL}/${item.picture.path}`
        : '',
    },
    producer: {
      name: item.userId.name,
    },
    createdAt: item.createdAt,
  };
}

export async function getProducts(url) {
  return await http.get(url).then((response) => {
    const { data: json } = response;

    const transformedData = json.data.map((item) => {
      return transformProduct(item);
    });

    return {
      data: transformedData,
      meta: json.meta,
    };
  });
}

export function getProduct({ id }) {
  return http.get(`/products/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformProduct(json.data),
    };
  });
}

export function createProduct(payload) {
  return http.post(`/products`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformProduct(json.data),
    };
  });
}

export function updateProduct(id, payload) {
  return http.put(`/products/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformProduct(json.data),
    };
  });
}

export function deleteProduct({ id }) {
  return http.delete(`/products/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformProduct(json.data),
    };
  });
}
