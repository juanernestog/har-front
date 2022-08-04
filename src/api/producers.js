import http from './http';
import { transformProduct } from './products';

function transformProducer(item) {
  return {
    id: item._id,
    firstname: item.firstname,
    lastname: item.lastname,
    name: item.name,
    email: item.email,
    tel: item.tel,
    products: Array.isArray(item.products)
      ? item.products.map(transformProduct)
      : [],
    type: 'producer',
  };
}

export async function logIn({ email, password }) {
  return http.post(`/producers/login`, { email, password }).then((response) => {
    const { data: json } = response;

    if (json.meta?.token) {
      localStorage.setItem('token', json.meta.token);
    }

    const user = transformProducer(json.data);

    localStorage.setItem('user', JSON.stringify(user));

    return {
      data: user,
    };
  });
}

export async function signUp(payload) {
  return http.post(`/producers/signup`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformProducer(json.data),
    };
  });
}

export async function getProducer({ id }) {
  const response = await http.get(`/producers/${id}`);
  const { data: json } = response;
  return {
    data: transformProducer(json.data),
  };
}

export async function updateProducer(id, payload) {
  return http.put(`/producers/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformProducer(json.data),
    };
  });
}

export async function deleteProducer({ id }) {
  return http.delete(`/producers/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformProducer(json.data),
    };
  });
}
