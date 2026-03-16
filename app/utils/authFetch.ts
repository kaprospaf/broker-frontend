import API from "../utils/api";

export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers,
  });

  // Auto logout if token expired
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return res;
};