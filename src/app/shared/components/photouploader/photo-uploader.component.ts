import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { PhotoUploaderService } from './services/photo-uploader.service';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'sman-photo-uploader',
    templateUrl: 'photo-uploader.component.html'
})

export class PhotoUploaderComponent implements OnInit {
    isDragOver = signal<boolean>(false);
    imagePreview = signal<string>('');
    photoUrl = signal<string>('www.test.com');
    uploadSuccess: boolean = false;
    selectedPhoto: File | null = null;
    @ViewChild('fileInput') fileInput: ElementRef | undefined;
    isMouseOver: boolean = false;
    @Output() fileSelected = new EventEmitter<string>();

    constructor(private photoUploadService: PhotoUploaderService) { }

    ngOnInit() {
    }

    onClick() {
        if (!this.uploadSuccess) {
            this.fileInput?.nativeElement.click()
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
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
                        this.fileSelected.emit(data.url);
                        this.uploadSuccess = true;
                    })
                }
            }
            reader.readAsDataURL(photo);


        } else {
            console.log("only image is allowed");
        }
    }

    onMouseOver() {
        this.isMouseOver = true;
    }

    onMouseLeave() {
        this.isMouseOver = false;
    }

    removeFile() {
        this.imagePreview.set('');
        this.photoUrl.set('');
        this.selectedPhoto = null;
        this.uploadSuccess = false;
    }

    log(e: any) {
        e.preventDefault()
        console.log(this.isDragOver());
        console.log('cancel');
        console.log(this.imagePreview());


    }
}