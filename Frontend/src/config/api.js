// API Configuration
export const API_BASE_URL = 'https://campuscabs-backend.vercel.app';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
  GUEST_AUTH: `${API_BASE_URL}/api/auth/guest`,
  VERIFY_TOKEN: `${API_BASE_URL}/api/auth/verify`,
  LOGIN: `${API_BASE_URL}/login`,
  SIGNUP: `${API_BASE_URL}/signup`,

  // Ride endpoints
  SAVE_RIDE_HISTORY: `${API_BASE_URL}/save-ride-history`,
  RIDE_HISTORY: `${API_BASE_URL}/ride-history`,

  // Health check
  HEALTH: `${API_BASE_URL}/health`
};
