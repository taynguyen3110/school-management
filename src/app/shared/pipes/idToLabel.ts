import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToLabel',
  standalone: true,
})
export class IdToLabelPipe implements PipeTransform {
  transform(id: string, arr: { id: string; label: string }[]): any {
    return arr.find((i) => i.id === id)?.label;
  }
}
