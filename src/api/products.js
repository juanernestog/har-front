import http from './http';

function transformProduct(item) {
  return {
    id: item._id,
    name: item.name,
    quantity: item.quantity,
    category: item.category,
    price: item.price,
    unit: item.unit,
    image: item.image,
    producer: {
      name: item.userId.name,
    },
    createdAt: item.createdAt,
  };
}

export async function getProducts() {
  return await http.get(`/products`).then((response) => {
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
