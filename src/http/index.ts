export async function request(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: object,
  headers: Record<string, string> = {}
) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${response.status}`);
  }

  return response.json();
}
