import axios from 'axios';

// Pull the base URL from Vite's environment variables, defaulting to local Django
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- FIREBASE AUTH INTERCEPTOR ---
// This ensures every request sends the Firebase token to Django automatically
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // TODO: Replace this with actual Firebase auth logic
      
      // Temporary placeholder for local testing
      const token = localStorage.getItem('firebase_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface AlertPreferences {
  email_notifications: boolean;
  categories: {
    sales: boolean;
    inventory: boolean;
    expenses: boolean;
    compliance: boolean;
    system: boolean;
  };
}

export interface BusinessProfilePayload {
  business_name: string;
  sector: string;
  business_stage: string;
  age_of_business: number;
  employee_count: number;
  revenue: number;
  profit_margin: number;
  bank_balance: number;
  tax_registered: boolean;
  licenses_up_to_date: boolean;
  additional_metrics?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  alert_preferences?: AlertPreferences;
}

// --- API ENDPOINT WRAPPERS ---
export const analyticsAPI = {
  getProfile: () => apiClient.get('/analytics/profile/'),
  createProfile: (data: BusinessProfilePayload) => apiClient.post('/analytics/profile/', data),
  updateProfile: (id: number, data: Partial<BusinessProfilePayload>) => apiClient.patch(`/analytics/profile/${id}/`, data),
  
  generateInsights: () => apiClient.post('/analytics/profile/generate-insights/'),
  
  getHealthHistory: () => apiClient.get('/analytics/health-history/'),

  getAlerts: () => apiClient.get('/analytics/alerts/'),
  resolveAlert: (id: number) => apiClient.patch(`/analytics/alerts/${id}/`, { is_resolved: true }),
};

export default apiClient;