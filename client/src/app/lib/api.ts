const BASE_URL = "http://localhost:5000/api/v1";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" };
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// ── Providers ──────────────────────────────────────────────────────────────
export const getProviders = (params?: { serviceCategory?: string; city?: string }) => {
  const qs = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : "";
  return request<any>(`/provider/list${qs}`);
};

export const getProviderById = (id: string) => request<any>(`/provider/profile/${id}`);

export const applyProvider = (formData: FormData) =>
  fetch(`${BASE_URL}/provider/apply`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  }).then((r) => r.json());

// Admin provider routes
export const getAdminApplications = () =>
  request<any>("/provider/applications", { headers: authHeaders() });

export const getAdminAllProviders = () =>
  request<any>("/provider/all", { headers: authHeaders() });

export const updateApplicationStatus = (id: string, status: string) =>
  request<any>(`/provider/applications/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });

// ── Services (categories) ──────────────────────────────────────────────────
export const getServices = () => request<any>("/services");

export const createService = (data: object) =>
  request<any>("/services", { method: "POST", headers: authHeaders(), body: JSON.stringify(data) });

export const updateService = (id: string, data: object) =>
  request<any>(`/services/${id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(data) });

export const deleteService = (id: string) =>
  request<any>(`/services/${id}`, { method: "DELETE", headers: authHeaders() });

// ── Bookings ───────────────────────────────────────────────────────────────
export const createBooking = (data: object) =>
  request<any>("/bookings", { method: "POST", headers: authHeaders(), body: JSON.stringify(data) });

export const getMyBookings = () =>
  request<any>("/bookings/my", { headers: authHeaders() });

export const cancelBooking = (id: string) =>
  request<any>(`/bookings/${id}/cancel`, { method: "PUT", headers: authHeaders() });

export const getAdminBookings = () =>
  request<any>("/bookings", { headers: authHeaders() });

export const updateBookingStatus = (id: string, status: string) =>
  request<any>(`/bookings/${id}/status`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });

// ── Reviews ────────────────────────────────────────────────────────────────
export const createReview = (data: object) =>
  request<any>("/reviews", { method: "POST", headers: authHeaders(), body: JSON.stringify(data) });

export const getProviderReviews = (providerId: string) =>
  request<any>(`/reviews/provider/${providerId}`);

export const getAdminReviews = () =>
  request<any>("/reviews", { headers: authHeaders() });

export const updateReviewStatus = (id: string, status: string) =>
  request<any>(`/reviews/${id}/status`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });

// ── Admin ──────────────────────────────────────────────────────────────────
export const getDashboard = () =>
  request<any>("/admin/dashboard", { headers: authHeaders() });

export const getAdminUsers = () =>
  request<any>("/admin/users", { headers: authHeaders() });

export const toggleUserStatus = (id: string) =>
  request<any>(`/admin/users/${id}/toggle-status`, { method: "PUT", headers: authHeaders() });
