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
    cartItems: Array.isArray(item.cartItems)
      ? item.cartItems.map(transformCartItem)
      : [],
    cartItemsCount: item.cartItemsCount,
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

export function createCart({
  address = '',
  userId = '',
  deliveryPrice = 0,
  total = 0,
}) {
  return http
    .post(`/carts`, { address, userId, deliveryPrice, total })
    .then((response) => {
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

export function deleteCart({ id }) {
  return http.delete(`/carts/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformCart(json.data),
    };
  });
}
