import http from './http';

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
