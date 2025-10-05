

const BASE_URL = 'http://localhost:5000/api/v1';

export const apiFetch = async (endpoint, token, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (response.status === 401) {
        throw new Error('Session expired. Please log in again.');
    }
    if (response.status === 403) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Access denied. Insufficient permissions.');
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    if (response.status === 204) return null;

    return response.json();
};