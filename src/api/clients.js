import http from './http';

function transformClient(item) {
  return {
    id: item._id,
    firstname: item.firstname,
    lastname: item.lastname,
    name: item.name,
    email: item.email,
    tel: item.tel,
  };
}

export async function logIn({ email, password }) {
  return http.post(`/clients/login`, { email, password }).then((response) => {
    const { data: json } = response;

    if (json.meta?.token) {
      localStorage.setItem('token', json.meta.token);
    }

    return {
      data: json.data,
    };
  });
}

export async function signUp(payload) {
  return http.post(`/clients/signup`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}

export async function getClient({ id }) {
  const response = await http.get(`/clients/${id}`);
  const { data: json } = response;
  return {
    data: transformClient(json.data),
  };
}
