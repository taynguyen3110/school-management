export const environment = {
  production: true,
  apiUrl: (window as any).env?.API_URL || "http://13.54.63.78:3001/",
  // 'https://school-mgmt-api-gkqr.onrender.com'
  googleMapsApiKey: (window as any).env?.GOOGLE_MAPS_API_KEY || 'AIzaSyALrnz4qQpv0DC1tMwSAwq7Jd12dc2e9vE',
  env: 'production' as 'development' | 'production'
} as const; 