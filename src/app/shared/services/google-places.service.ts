import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({ providedIn: 'root' })
export class GooglePlaceService {
  private googleMapsLoaded = false;

  constructor() {
    this.loadGoogleMaps();
  }

  private loadGoogleMaps(): void {
    // Load the Google Maps API with the Places library
    if (!this.googleMapsLoaded) {
      window['google'] = window['google'] || {};
      window['google'].maps = window['google'].maps || {};
      window['google'].maps.importLibrary =
        window['google'].maps.importLibrary ||
        function (library: string) {
          return new Promise((resolve, reject) => {
            if (window['google']?.maps) {
              const { Place } = window['google'].maps.importLibrary('places');
              resolve(Place);
            } else {
              reject('Google Maps API not loaded yet');
            }
          });
        };

      // Load the Google Maps API with the Places library
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initializeGoogleMaps`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      this.googleMapsLoaded = true;
    }
  }

  public async getPlaceService() {
    try {
      const Place = await google.maps.importLibrary('places');
      return Place;
    } catch (error) {
      console.error('Error loading Place service:', error);
    }
  }
}
