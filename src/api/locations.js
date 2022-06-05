import http from './http';

function transformLocation(item) {
  return {
    id: item._id,
    address: item.address,
    department: item.department,
    city: item.city,
    producer: {
      name: item.userId.name,
    },
    createdAt: item.createdAt,
  };
}

export async function getLocations() {
  return await http.get(`/locations`).then((response) => {
    const { data: json } = response;

    const transformedData = json.data.map((item) => {
      return transformLocation(item);
    });

    return {
      data: transformedData,
      meta: json.meta,
    };
  });
}

export function getLocation({ id }) {
  return http.get(`/locations/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformLocation(json.data),
    };
  });
}

export function createLocation({ content }) {
  return http.post(`/locations`, { content }).then((response) => {
    const { data: json } = response;
    return {
      data: transformLocation(json.data),
    };
  });
}

export function updateLocation(payload) {
  const { id } = payload;
  return http.put(`/locations/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformLocation(json.data),
    };
  });
}
