import http from './http';

export function transformCartItem(item) {
  return {
    id: item._id,
    product: {
      name: item.productId.name,
      category: item.productId.category,
      unit: item.productId.unit,
      price: item.productId.price,
    },
    quantity: item.quantity,
    createdAt: item.createdAt,
  };
}

export async function getCartItems() {
  return await http.get(`/cartItems`).then((response) => {
    const { data: json } = response;

    const transformedData = json.data.map((item) => {
      return transformCartItem(item);
    });

    return {
      data: transformedData,
      meta: json.meta,
    };
  });
}

export function getCartItem({ id }) {
  return http.get(`/cartItems/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformCartItem(json.data),
    };
  });
}

export function createCartItem(payload) {
  return http.post(`/cartItems`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformCartItem(json.data),
    };
  });
}

export function updateCartItem(payload) {
  const { id } = payload;
  return http.put(`/cartItems/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformCartItem(json.data),
    };
  });
}
