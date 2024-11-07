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

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sman-photo-uploader',
  templateUrl: 'photo-uploader.component.html',
})
export class PhotoUploaderComponent implements OnInit {
  @Input() inputUrl: string = '';
  @Output() photoUploaded = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  isDragOver = signal<boolean>(false);
  imagePreview = signal<string>('');
  photoUrl = signal<string>('');
  uploadSuccess: boolean = false;
  selectedPhoto: File | null = null;
  isMouseOver: boolean = false;

  constructor(private photoUploadService: PhotoUploaderService) {}

  ngOnInit() {
    this.imagePreview.set(this.inputUrl);
  }

  onClick(e: MouseEvent) {
    if (
      (e.target as HTMLElement).tagName === 'INPUT' ||
      this.imagePreview() !== ''
    ) {
      return;
    }
    if (!this.uploadSuccess) {
      this.fileInput?.nativeElement.click();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
    console.log(this.isDragOver());
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    console.log(this.isDragOver());
    const photo = event.dataTransfer?.files[0] as File | null;
    this.uploadPhoto(photo);
  }

  onFileChange(event: any) {
    const photo = event.target.files[0] as File | null;
    this.uploadPhoto(photo);
  }

  uploadPhoto(photo: File | null) {
    if (photo && photo.type.startsWith('image/')) {
      // file size check
      this.selectedPhoto = photo;
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoBase64 = e.target?.result as string;
        if (photoBase64) {
          this.imagePreview.set(photoBase64);
          this.photoUploadService.uploadPhoto(photoBase64).subscribe((data) => {
            this.photoUrl.set(data.url);
            this.photoUploaded.emit(data.url);
            this.uploadSuccess = true;
          });
        }
      };
      reader.readAsDataURL(photo);
    } else {
      // check file empty or not
      console.log('only image is allowed');
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
    this.imagePreview.set('');
    this.photoUrl.set('');
    this.selectedPhoto = null;
    this.uploadSuccess = false;
  }

  logData(e: any) {
    e.preventDefault();
    console.log(this.isDragOver());
    console.log('cancel');
    console.log(this.imagePreview());
  }
}
