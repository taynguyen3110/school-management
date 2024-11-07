import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PhotoUrl } from '../../../types';

@Injectable({ providedIn: 'root' })
export class PhotoUploaderService {
  constructor(private apiService: ApiService) {}

  uploadPhoto(base64: string) {
    return this.apiService.post<PhotoUrl>('/media/photo', { base64 });
  }
}
