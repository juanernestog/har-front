import { transformCartItem } from './cartItems';
import http from './http';

function transformCart(item) {
  return {
    id: item._id,
    client: {
      name: item.userId.name,
    },
    address: item.address,
    deliveryPrice: item.deliveryPrice,
    total: item.total,
    createdAt: item.createdAt,
    cartItems: Array.isArray(item.cartItems)
      ? item.cartItems.map(transformCartItem)
      : [],
  };
}

export function getCart({ id }) {
  return http.get(`/carts/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformCart(json.data),
    };
  });
}

export function createCart({ content }) {
  return http.post(`/carts`, { content }).then((response) => {
    const { data: json } = response;
    return {
      data: transformCart(json.data),
    };
  });
}

export function updateCart(payload) {
  const { id } = payload;
  return http.put(`/carts/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformCart(json.data),
    };
  });
}
