import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Params } from '@angular/router';
import { Classes, LabelObj } from '../../types';
import { MultiSelectorComponent } from '../multiselector/multiselector.component';
import { ClassesService } from '../../../school-classes/services/classes.service';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from "../input/input.component";

@Component({
    imports: [
    MultiSelectorComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
],
    selector: 'sman-filter',
    templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnInit {
  @Input() queryParams: Params = {};
  @Input() nameOnly: boolean = false;

  @Output() filter = new EventEmitter<Params>();
  @Output() reset = new EventEmitter<void>();

  fullClassList: Classes[] = [];
  classes: Classes[] = [];
  selectedClassIds: string[] = [];
  selectedClasses: LabelObj[] = [];
  formValid: boolean = false;

  constructor(
    private classesService: ClassesService,
    private fb: FormBuilder
  ) {}

  filterForm = this.fb.group({
    name: ['', [Validators.required]],
    classIds: ['', [Validators.required]],
  });

  ngOnChanges() {
    this.getQueryParams();
  }

  ngOnInit() {
    this.classesService.getClasses().subscribe((data: any) => {
      this.classes = data.classes;
    });
    this.classesService.lookUpByName().subscribe((data) => {
      this.fullClassList = data.classes;
      this.getSelectedClasses();
    });
    this.checkForm();
    this.name.valueChanges.subscribe(() => {
      this.checkForm();
    });
    this.classIds.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  get name() {
    return this.filterForm.get('name') as FormControl;
  }
  get classIds() {
    return this.filterForm.get('classIds') as FormControl;
  }

  checkForm() {
    this.formValid =
      !this.name.hasError('required') || !this.classIds.hasError('required');
  }

  getQueryParams() {
    this.queryParams['name']
      ? this.name.setValue(this.queryParams['name'])
      : this.name.setValue('');
    if (this.queryParams['classIds']) {
      this.selectedClassIds = this.queryParams['classIds'].split(',');
      this.classIds.setValue(this.queryParams['classIds'])
    } else {
      this.selectedClassIds = []
    }
  }

  classList() {
    return this.classes.map((c) => {
      return { id: c.id, label: c.name };
    });
  }

  getSelectedClasses() {
    const list = this.selectedClassIds.map((id) => {
      return this.fullClassList.find((c) => c.id === id);
    });
    this.selectedClasses = list.map((li) => {
      return { id: li?.id, label: li?.name } as LabelObj;
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
    this.selectedClassIds = classes;
  }

  lookUpClassesByName(name: string) {
    this.classesService.lookUpByName(name).subscribe((data) => {
      this.classes = data.classes;
    });
  }

  applyFilter() {
    this.filter.emit(this.filterForm.value);
  }

  resetFilter() {
    this.selectedClasses = [];
    this.filterForm.setValue({ name: '', classIds: '' });
    this.reset.emit();
  }
}
