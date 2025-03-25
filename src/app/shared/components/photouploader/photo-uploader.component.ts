import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { PhotoUploaderService } from './services/photo-uploader.service';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';
import { ScreenService } from '../../services/screen.service';
import { ScreenSize } from '../../types';
import { environment } from '@/environments/environment';

@Component({
    imports: [CommonModule, ProfilePhotoComponent],
    selector: 'sman-photo-uploader',
    templateUrl: 'photo-uploader.component.html'
})
export class PhotoUploaderComponent implements OnInit {
  @Input() inputUrl: string = '';
  @Output() photoUploaded = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  private readonly apiUrl = environment.apiUrl;

  readonly defaultPhoto: string =
    `${this.apiUrl}/photos/profile-picture.jpg`;

  isDragOver = signal<boolean>(false);
  imagePreview = signal<string>(this.defaultPhoto);
  photoUrl = signal<string>('');
  uploadSuccess: boolean = false;
  selectedPhoto: File | null = null;
  isMouseOver: boolean = false;
  errMsg: string = '';

  constructor(
    private photoUploadService: PhotoUploaderService,
    private screenService: ScreenService
  ) {}

  ngOnInit() {
    if (this.inputUrl !== '') {
      this.imagePreview.set(this.inputUrl);
    }
  }

  screenSize(size: ScreenSize): boolean {
    let match: boolean = false;
    this.screenService.observeScreen(size).subscribe((result) => {
      match = result;
    });
    return match;
  }

  onClick(e: MouseEvent) {
    if (
      (e.target as HTMLElement).tagName === 'INPUT'
      //  || this.imagePreview() !== this.defaultPhoto
    ) {
      return;
    }
    // if (!this.uploadSuccess) {
    this.fileInput?.nativeElement.click();
    // }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    const photo = event.dataTransfer?.files[0] as File | null;
    this.uploadPhoto(photo);
  }

  onFileChange(event: any) {
    const photo = event.target.files[0] as File | null;
    this.uploadPhoto(photo);
  }

  uploadPhoto(photo: File | null) {
    if (photo) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(photo.type)) {
        this.errMsg = 'Only JPEG, PNG images are allowed.';
        return;
      }
      // file size check
      const maxSize = 2 * 1024 * 1024;
      if (photo.size > maxSize) {
        this.errMsg = 'File size exceeds the maximum limit of 2 MB.';
        return;
      }
      this.selectedPhoto = photo;

      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          const maxWidth = 1024;
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = image;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          // Resize image
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);

          // Convert canvas to Base64
          const photoBase64 = canvas.toDataURL(photo.type);
          // const photoBase64 = e.target?.result as string;
          if (photoBase64) {
            this.imagePreview.set(photoBase64);
            this.photoUploadService
              .uploadPhoto(photoBase64)
              .subscribe((data) => {
                this.photoUrl.set(data.url);
                this.photoUploaded.emit(data.url);
                this.uploadSuccess = true;
              });
          }
        };
        if (e.target?.result) {
          image.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(photo);
    }
  }

  onMouseOver() {
    this.isMouseOver = true;
  }

  onMouseLeave() {
    this.isMouseOver = false;
  }

  removeFile(e: Event) {
    e.stopPropagation();
    this.imagePreview.set(this.defaultPhoto);
    this.photoUrl.set('');
    this.selectedPhoto = null;
    this.uploadSuccess = false;
  }

  onCancel(e: any) {
    e.stopPropagation();
  }
}
