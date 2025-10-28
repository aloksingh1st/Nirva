import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000", // if using Vite
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

// Request interceptor (attach token if available)
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token: string | null = null;

    console.log("cookies ", document.cookie);

    if (typeof window !== "undefined" && document.cookie) {
      // Find the cookie named "token"
      const match = document.cookie
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("token="));
      if (match) token = match.split("=")[1];
    }

    console.log("token", token);
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Optionally handle token expiration / logout
      console.warn("Unauthorized! Token may have expired.");
    }
    return Promise.reject(error);
  }
);

export default api;
