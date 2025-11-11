// Application configuration
export const appConfig = {
  name: 'React TypeScript Starter',
  version: '1.0.0',
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  auth: {
    tokenKey: 'authToken',
    refreshTokenKey: 'refreshToken',
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  },
};

export default appConfig;
