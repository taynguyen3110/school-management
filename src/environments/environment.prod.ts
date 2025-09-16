export const environment = {
  production: true,
  apiUrl: (window as any).env?.API_URL || "https://b1093e5fca22.ngrok-free.app",
  // 'https://school-mgmt-api-gkqr.onrender.com'
  googleMapsApiKey: (window as any).env?.GOOGLE_MAPS_API_KEY || 'AIzaSyALrnz4qQpv0DC1tMwSAwq7Jd12dc2e9vE',
  env: 'production' as 'development' | 'production'
} as const; 