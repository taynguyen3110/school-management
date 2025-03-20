import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'sman-loading-spinner',
    imports: [AsyncPipe, MatProgressSpinnerModule],
    templateUrl: './loading-spinner.component.html',
    styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  @Input() isLoading: boolean = false;
  isLoading$: Observable<boolean> = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {}
}
