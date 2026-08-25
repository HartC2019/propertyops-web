const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

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

export async function getDashboard(token) {
  return request("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
