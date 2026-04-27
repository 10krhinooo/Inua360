import axios from 'axios';

// Pull the base URL from Vite's environment variables, defaulting to local Django
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Request Interceptor
// apiClient.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const refreshToken = localStorage.getItem('refresh_token');

      // if (refreshToken) {
      try {
        await axios.post(`${API_BASE_URL}/auth/token/refresh/`, { withCredentials: true });

        // const newAccessToken = response.data.access;
        // localStorage.setItem('auth_token', newAccessToken);

        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // localStorage.removeItem('auth_token');
        // localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
      // }
    }
    return Promise.reject(error);
  }
);

export interface AlertPreferences {
  email_notifications?: boolean;
  categories: {
    sales: boolean;
    inventory: boolean;
    expenses: boolean;
    compliance: boolean;
    system: boolean;
  };
  channels?: {
    whatsapp: boolean;
    webapp: boolean;
    ussd: boolean;
    sms: boolean;
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
export const authAPI = {
  register: async (data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return { data: { success: true } };
  },
  login: async (data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return { data: { access: 'mock-token', refresh: 'mock-refresh' } };
  },
  googleAuth: async (idToken: string) => {
    return { data: { is_new_user: false } };
  },
  googleLogin: async (token: string) => {
    return { data: { is_new_user: false } };
  },
  logout: async () => {
    return { data: { success: true } };
  },
};

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