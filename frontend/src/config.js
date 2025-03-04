const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5002',
  wsUrl: process.env.REACT_APP_WS_URL || 'ws://localhost:5002',
  env: process.env.NODE_ENV || 'development',
  support: {
    email: 'support@smartprobono.org',
    phone: '+1 (800) PRO-BONO',
    hours: '9:00 AM - 5:00 PM EST',
    responseTime: '24-48 hours'
  },
  features: {
    enableWebSocket: false, // Disable WebSocket for now until we implement it properly
    enableAnalytics: true,
    enableFeedback: true,
  }
};

export default config; 