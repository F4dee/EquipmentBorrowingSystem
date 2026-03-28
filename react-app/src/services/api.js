// Backend API service

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Helper for sending generic HTTP requests using fetch
const fetchApi = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        const text = await res.text();
        let json = null;
        if (text && text.trim().length > 0) {
            try {
                json = JSON.parse(text);
            } catch (e) {
                console.warn('Response was not valid JSON:', text);
            }
        }

        if (!res.ok) {
            throw new Error(`[HTTP ${res.status}] ` + (json?.error?.message || json?.message || text || 'API request failed'));
        }

        if (json && typeof json === 'object') {
            if (json.success === false) {
                throw new Error(json?.error?.message || json?.message || 'API request reported failure');
            }
            // Return the actual payload enclosed inside `data` block of the ApiResponse struct
            return json.data !== undefined ? json.data : json;
        }

        return text;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

// Auth requests
export const authApi = {
    login: (credentials) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
};

// --- NEW AUTHENTICATED REQUESTS WRAPPER FROM PHASE 5 ---
const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Equipment requests
export const equipmentApi = {
    getAll: () => fetchApi('/items', { headers: getAuthHeaders() }),
    getById: (id) => fetchApi(`/items/${id}`, { headers: getAuthHeaders() }),
    borrow: (id) => fetchApi(`/items/${id}/borrow`, { method: 'POST', headers: getAuthHeaders() }),
    return: (id) => fetchApi(`/items/${id}/return`, { method: 'POST', headers: getAuthHeaders() }),
    // Admin CRUD
    create: (payload) => fetchApi('/items', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload) }),
    update: (id, payload) => fetchApi(`/items/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload) }),
    delete: (id) => fetchApi(`/items/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
};

// Request workflows (Borrowing Requests)
export const requestApi = {
    // For Admins
    getAll: () => fetchApi('/admin/requests/pending', { headers: getAuthHeaders() }),

    // For Users
    getByUser: (userId) => fetchApi(`/requests/user/${userId}`, { headers: getAuthHeaders() }),

    // User Submission
    create: (payload) => fetchApi('/requests', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    }),

    // Status Transitions (Admin usually)
    updateStatus: (id, status) => fetchApi(`/requests/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
    })
};

// Maintenance Tickets
export const ticketApi = {
    // Submit Ticket
    create: (payload) => {
        // SDD Specifies multi-part form data here in the future
        return fetchApi('/tickets', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
        })
    },

    // For Admins (mapped to standard ticket logic for this demonstration)
    getAll: () => fetchApi('/admin/tickets', { headers: getAuthHeaders() }),
};
