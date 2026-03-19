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
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem('auth_token');
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
  register: (data: any) => apiClient.post('/auth/register/', data),
  login: (data: any) => apiClient.post('/auth/login/', data),
  googleAuth: (idToken: string) => apiClient.post('/auth/google/', { id_token: idToken }),
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