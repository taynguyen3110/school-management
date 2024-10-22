import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sman-loading-spinner',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  private loadingService = inject(LoadingService);
  isLoading$: Observable<boolean> = this.loadingService.loading$;

  ngOnInit() {
    // console.log(this.isLoading$);
  }
}
