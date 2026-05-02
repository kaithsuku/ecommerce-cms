const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("cms_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (response.status === 204) {
    return null;
  }

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || "Request failed");
  }

  return body;
}

export const api = {
  async login(credentials) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },
  async stats() {
    return request("/dashboard/stats");
  },
  async products(params = {}) {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, value]) => value !== "")
    ).toString();
    return request(`/products${query ? `?${query}` : ""}`);
  },
  async createProduct(product) {
    return request("/products", { method: "POST", body: JSON.stringify(product) });
  },
  async updateProduct(id, product) {
    return request(`/products/${id}`, { method: "PUT", body: JSON.stringify(product) });
  },
  async deleteProduct(id) {
    return request(`/products/${id}`, { method: "DELETE" });
  },
  async categories() {
    return request("/categories");
  },
  async createCategory(category) {
    return request("/categories", { method: "POST", body: JSON.stringify(category) });
  },
  async updateCategory(id, category) {
    return request(`/categories/${id}`, { method: "PUT", body: JSON.stringify(category) });
  },
  async deleteCategory(id) {
    return request(`/categories/${id}`, { method: "DELETE" });
  },
  async orders() {
    return request("/orders");
  },
  async updateOrderStatus(id, status) {
    return request(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status })
    });
  }
};

