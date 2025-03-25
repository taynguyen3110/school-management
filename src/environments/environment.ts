export const environment = {
  production: false,
  apiUrl: (window as any).env?.API_URL || 'http://localhost:3001',
  // apiUrl: 'http://localhost:3001',
  googleMapsApiKey: (window as any).env?.GOOGLE_MAPS_API_KEY || 'AIzaSyALrnz4qQpv0DC1tMwSAwq7Jd12dc2e9vE',
  env: 'development' as 'development' | 'production'
} as const;
// Define the environment interface
export interface Environment {
  production: boolean;
  apiUrl: string;
  googleMapsApiKey: string;
  env: 'development' | 'production';
}

