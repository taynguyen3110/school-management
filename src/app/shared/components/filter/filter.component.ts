import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { Params } from '@angular/router';
import { Classes } from '../../types';
import { MultiSelectorComponent } from '../multiselector/multiselector.component';
import { ClassesService } from '../../../school-classes/services/classes.service';

@Component({
  standalone: true,
  imports: [MultiSelectorComponent, CommonModule, ReactiveFormsModule],
  selector: 'sman-filter',
  templateUrl: 'filter.component.html',
})
export class FilterComponent implements OnInit {
  @Input() queryParams: Params = {};
  @Input() nameOnly: boolean = false;

  @Output() filter = new EventEmitter<Params>();

  classes: Classes[] = [];
  selectedClasses: string[] = [];

  constructor(
    private classesService: ClassesService,
    private fb: FormBuilder,
  ) {}

  filterForm = this.fb.group({
    name: ['', []],
    classIds: ['', []],
  });

  ngOnChanges() {
    this.getQueryParams();
  }

  ngOnInit() {
    this.classesService.getClasses().subscribe((data: any) => {
      this.classes = data.classes;
    });
  }

  get name() {
    return this.filterForm.get('name') as FormControl;
  }
  get classIds() {
    return this.filterForm.get('classIds') as FormControl;
  }

  getQueryParams() {
    this.queryParams['name']
      ? this.name.setValue(this.queryParams['name'])
      : this.name.setValue('');
    this.selectedClasses = this.queryParams['classIds']
      ? this.queryParams['classIds'].split(',')
      : [];
  }

  classList() {
    return this.classes.map((c) => {
      return { id: c.id, label: c.name };
    });
  }

  handleSelect(eventData: string[] | string) {
    if (Array.isArray(eventData)) {
      this.updateClassFilter(eventData);
    }
  }

  updateClassFilter(classes: string[]) {
    this.filterForm.setValue({
      name: this.name.value,
      classIds: classes.join(','),
    });
    this.selectedClasses = classes;
  }

  lookUpClassesByName(name: string) {
    this.classesService.lookUpByName(name).subscribe((data) => {
      this.classes = data.classes;
    });
  }

  applyFilter() {
    this.filter.emit(this.filterForm.value);
  }
}
