const API = import.meta.env.VITE_API;

async function request(url, options = {}) {
  const response = await fetch(API + url, options);
  const responseText = await response.text();

  let data = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message || "Something went wrong.";

    throw new Error(message);
  }

  return data;
}

export async function getProperties(token) {
  return request("/properties", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProperty(id, token) {
  return request(`/properties/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createProperty(property, token) {
  return request("/properties", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  });
}

export async function updateProperty(id, property, token) {
  return request(`/properties/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  });
}

export async function deleteProperty(id, token) {
  return request(`/properties/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
