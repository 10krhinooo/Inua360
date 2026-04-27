export const mockApi = {
  // Simulate network delay
  delay: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),

  getHealthHistory: async () => {
    await mockApi.delay();
    return {
      data: [
        {
          id: 1,
          overall_score: 72,
          health_category: 'Fair',
          funding_readiness: 65,
          compliance_risk: 10,
          growth_potential: 80,
          operational_efficiency: 60,
          generated_at: new Date().toISOString(),
          ai_insights: [
            { flag: 'Revenue_Drop', triggered: true },
            { flag: 'Tax_Compliance', triggered: true }
          ]
        },
        {
          id: 2,
          overall_score: 68,
          health_category: 'Needs Work',
          funding_readiness: 50,
          compliance_risk: 25,
          growth_potential: 75,
          operational_efficiency: 55,
          generated_at: new Date(Date.now() - 86400000).toISOString(),
          ai_insights: []
        }
      ]
    };
  },

  getAlerts: async () => {
    await mockApi.delay();
    // Return empty array to trigger empty state!
    return { data: [] };
  },

  getFundingMatches: async () => {
    await mockApi.delay();
    // Return empty array to trigger empty state!
    return { data: [] };
  },

  getProfile: async () => {
    await mockApi.delay();
    return {
      data: {
        business_name: 'Acme Corp',
        sector: 'Retail',
        revenue: 50000,
        tax_registered: true,
        bank_balance: 5000
      }
    };
  },

  createProfile: async (payload: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    await mockApi.delay();
    return { data: payload };
  },

  generateInsights: async () => {
    await mockApi.delay();
    return { data: { success: true } };
  },

  resolveAlert: async (id: number) => {
    await mockApi.delay();
    return { data: { success: true, id } };
  },

  updateProfile: async (id: number, payload: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    await mockApi.delay();
    return { data: { success: true, id, payload } };
  }
};
