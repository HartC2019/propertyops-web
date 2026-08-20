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

export async function getIncome(propertyId, token) {
  return request(`/income?property_id=${propertyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createIncome(income, token) {
  return request("/income", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(income),
  });
}

export async function deleteIncome(id, token) {
  return request(`/income/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
