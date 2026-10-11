const API_BASE =
  import.meta.env.VITE_API_URL ? "http://localhost:5678" : "";

export function apiFetch(path, options = {}) {
  return fetch(`${API_BASE}${path}`, options);
}