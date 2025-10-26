// import { useEntrixKey } from "nirva";
// export async function request(
//   url: string,
//   method: "GET" | "POST" | "PUT" | "DELETE",
//   body?: object,
//   headers: Record<string, string> = {}
// ) {
//   const response = await fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...headers,
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   if (!response.ok) {
//     const error = await response.json().catch(() => ({}));
//     throw new Error(error.message || `Request failed: ${response.status}`);
//   }

//   return response.json();
// }

// EntrixClient.ts
let apiKey: string | null = null;

// Initialize the SDK with the API key
export const initEntrixClient = (key: string) => {
  if (!key) throw new Error("API key is required");
  apiKey = key;
};

// Retrieve the API key internally
export const getApiKey = (): string => {
  if (!apiKey)
    throw new Error(
      "Entrix client is not initialized. Call initEntrixClient first."
    );
  return apiKey;
};
export async function request(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: object,
  headers: Record<string, string> = {}
) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "x-nirva-key": apiKey } : {}),
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
